import { v2 as cloudinary } from 'cloudinary';
import { config } from '../config/env.js';

const isConfigured = Boolean(
  config.cloudinary.cloudName
  && config.cloudinary.apiKey
  && config.cloudinary.apiSecret
);

if (isConfigured) {
  cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret
  });
}

function assertConfigured() {
  if (!isConfigured) {
    const error = new Error('La configuration Cloudinary est incomplète.');
    error.statusCode = 503;
    error.code = 'CLOUDINARY_NOT_CONFIGURED';
    throw error;
  }
}

export function uploadCloudinaryImage(buffer, folder) {
  assertConfigured();

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp']
      },
      (error, result) => {
        if (error) {
          reject(error);
          return;
        }

        if (!result?.public_id || !result.secure_url) {
          reject(new Error('Cloudinary n’a pas retourné les informations de la photo.'));
          return;
        }

        resolve({
          publicId: result.public_id,
          url: result.secure_url
        });
      }
    );

    stream.on('error', reject);
    stream.end(buffer);
  });
}

export async function deleteCloudinaryImages(publicIds) {
  if (publicIds.length === 0) {
    return;
  }

  assertConfigured();
  const results = await Promise.allSettled(publicIds.map(async (publicId) => {
    const result = await cloudinary.uploader.destroy(publicId, {
      invalidate: true,
      resource_type: 'image'
    });

    if (result.result !== 'ok' && result.result !== 'not found') {
      throw new Error(`Cloudinary n’a pas supprimé la photo ${publicId}.`);
    }
  }));
  const failures = results
    .filter((result) => result.status === 'rejected')
    .map((result) => result.reason);

  if (failures.length > 0) {
    throw new AggregateError(failures, 'La suppression de photos Cloudinary a échoué.');
  }
}
