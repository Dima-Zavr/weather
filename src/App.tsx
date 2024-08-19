import "./index.css"

import { useEffect, useState } from "react"

import * as api from "@api/requests/index.ts"
import { Current } from "@components/Current/Current.tsx"
import { Forecast } from "@components/Forecast/Forecast.tsx"
import { Info } from "@components/Info/Info.tsx"
import { Preloader } from "@components/Preloader/Preloader.tsx"

export const App = () => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        api.getForecast({ params: { days: 14 } }).then((response) => {
            setData(response.data)
            console.log(response.data)
            setIsLoading(false)
            if (response.data.current.is_day === 0) {
                document.documentElement.classList.add("dark")
            } else {
                document.documentElement.classList.remove("dark")
            }
        })
    }, [])

    return (
        <div className="scrollbar-hide w-dvw h-dvh overflow-x-hidden overflow-y-scroll bg-gradient-to-r from-sky-500 to-blue-500 dark:from-[#0f0c29] dark:to-[#24243e]">
            {isLoading ? (
                <Preloader />
            ) : (
                <div className="p-2 sm:p-4 dark:text-white">
                    <Current
                        location={data.location}
                        current={data.current}
                        hours={data.forecast.forecastday[0].hour}
                        temp={{
                            max: data.forecast.forecastday[0].day.maxtemp_c,
                            min: data.forecast.forecastday[0].day.mintemp_c
                        }}
                    />
                    <Forecast forecastdays={data.forecast.forecastday} />
                    <Info current={data.current} />
                </div>
            )}
        </div>
    )
}
