import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)

  const fetchData = () => {
    data.value = null
    error.value = null

    const valueUrl = toValue(url)
    if (valueUrl) {
      fetch(valueUrl, {
        headers: { 'xc-token': import.meta.env.VITE_APP_API_TOKEN },
        cache: 'force-cache'
      })
        .then((res) => res.json())
        .then((json) => (data.value = json))
        .catch((err) => (error.value = err))
    }
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error }
}
