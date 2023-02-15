import { useState } from 'react'

export const useRefresh = () => {
  const [count, setCount] = useState(0)

  const increment = () => setCount((prevCount) => prevCount + 1)
  return [increment, count]
}
