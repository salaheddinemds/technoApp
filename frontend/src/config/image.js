export function getOptimizedImageUrl(imageUrl, width) {
  if (typeof imageUrl !== 'string' || !imageUrl.startsWith('https://res.cloudinary.com/')) {
    return imageUrl
  }

  const uploadPath = '/image/upload/'
  const uploadPathIndex = imageUrl.indexOf(uploadPath)

  if (uploadPathIndex === -1) {
    return imageUrl
  }

  const transformation = `f_auto,q_auto,w_${width},c_limit`
  const pathStart = uploadPathIndex + uploadPath.length
  const imagePath = imageUrl.slice(pathStart)

  if (imagePath.startsWith('f_auto,')) {
    return imageUrl
  }

  return `${imageUrl.slice(0, pathStart)}${transformation}/${imagePath}`
}
