import axios from 'axios'
import { DEFAULT_URLS } from './enum'

const withBaseURLContext = () =>
	process.env.NODE_ENV
		? DEFAULT_URLS[process.env.NODE_ENV.toUpperCase()]
		: DEFAULT_URLS.DEVELOPMENT

const HTTPClient = axios.create({
	baseURL: withBaseURLContext(),
	headers: {},
})

HTTPClient.interceptors.request.use(config => {
	const token = window.localStorage.getItem('token')

	if (token) {
		config.headers.common.Authorization = `Bearer ${token}`
	}

	return config
})

HTTPClient.interceptors.response.use(
	res => {
		return res
	},
	err => Promise.reject(err)
)

export default HTTPClient
