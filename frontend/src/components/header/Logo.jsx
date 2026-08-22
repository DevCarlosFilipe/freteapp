import { useEffect, useState } from 'react'

function Logo({ img, siteName }) {

    function returnLogo(boolean) {
        if (boolean) {
            return <img className="logo" src={img} alt={siteName} />
        } else {
            return <h1>{siteName}</h1>
        }
    }

    const [imageValid, setImageValid] = useState(Boolean(img))

    useEffect(() => {
        setImageValid(Boolean(img))
    }, [img])

    return (
        <div className="logo-container">
            <a href="/">
                {returnLogo(imageValid)}
            </a>
        </div>
    )


}

export default Logo