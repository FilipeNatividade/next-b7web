import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

const Idade = () => {
    const [anos, setAnos] = useState<string>('10')
    const { query } = useRouter()


    useEffect(() => {
        switch (query.slug) {
            case 'joao':
                setAnos('32')
                break;
            case 'bonieky':
                setAnos('50')
                break;
            default:
                break;
        }
    })

    return (
        <div>{query.slug} tem {anos} anos</div>
    )

}

export default Idade