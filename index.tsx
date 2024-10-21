'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import getYoutubeId from 'get-youtube-id'
import { CgSpinner } from 'react-icons/cg'
import { Youtube } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function Component() {
  const [loading, setLoading] = useState(false)
  const [ytData, setYtData] = useState(null)
  const { register, handleSubmit } = useForm()

  async function onSubmit(data) {
    setLoading(true)
    const yt_id = getYoutubeId(data.yturl)
    try {
      const response = await ytApi(yt_id)
      setYtData(response)
    } catch (error) {
      console.error('Error fetching YouTube data:', error)
    }
    setLoading(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <header className="w-full bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Youtube className="h-6 w-6" />
            <span className="text-xl font-bold">YTDLX</span>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">YouTube Video Downloader</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter YouTube URL"
              {...register('yturl', { required: true })}
              className="flex-grow"
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <CgSpinner className="mr-2 h-4 w-4 animate-spin" />
                  Processing
                </>
              ) : (
                'Download'
              )}
            </Button>
          </div>
        </form>

        {ytData && (
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              {ytData.thumbnail && ytData.thumbnail[2] ? (
                <Image
                  src={ytData.thumbnail[2].url}
                  width={500}
                  height={500}
                  alt="Video Thumbnail"
                  className="rounded-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Thumbnail not available</p>
                </div>
              )}
              <h2 className="mt-4 text-xl font-bold">{ytData.title}</h2>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Available Formats</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="px-4 py-2 text-left">Quality</th>
                      <th className="px-4 py-2 text-left">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ytData.formats && ytData.formats.length > 0 ? (
                      ytData.formats.reverse().map((video) => (
                        <tr key={video.itag} className="border-b">
                          <td className="px-4 py-2">{video.qualityLabel || 'Unknown'}</td>
                          <td className="px-4 py-2">
                            {video.url ? (
                              <a
                                href={video.url}
                                className="text-blue-600 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                                download={ytData.title}
                              >
                                Download
                              </a>
                            ) : (
                              'Not available'
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={2} className="px-4 py-2 text-center">No formats available</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="w-full bg-white border-t">
        <div className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Youtube className="h-6 w-6" />
              <span className="font-bold">YTDLX</span>
            </div>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Instagram</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">Twitter</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
                <span className="sr-only">GitHub</span>
                <svg
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

async function ytApi(ytId) {
  try {
    const url = `https://ytstream-download-youtube-videos.p.rapidapi.com/dl?id=${ytId}`
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
        'X-RapidAPI-Host': 'ytstream-download-youtube-videos.p.rapidapi.com',
      },
    }
    const response = await fetch(url, options)
    const result = await response.json()
    
    // Add a fallback for thumbnail if it's not available
    if (!result.thumbnail || !Array.isArray(result.thumbnail) || result.thumbnail.length === 0) {
      result.thumbnail = [{ url: '/placeholder.svg' }]
    }
    
    return Promise.resolve(result)
  } catch (error) {
    return Promise.reject({ msg: error })
  }
}
