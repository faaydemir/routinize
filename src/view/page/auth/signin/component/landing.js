import React from 'react'

const Landing = () => {
    const landingContent = {
        appName: "routinize",
        subtitle: "simplify task tracking",
        description: " allows you to keep track of your goals or tasks that are recurring periodically.",
        mail: "",
    }

    return (
        <div className="app-info">
            <h1 className="title">{landingContent.appName}</h1>
            <h2 className="sub-title">{landingContent.subtitle}</h2>
            <span className="description"><strong className="description emphasis">{landingContent.appName}</strong>{landingContent.description}</span>
            <img src="image.png" alt="app screenshot"></img>
        </div>
    )
}

export default Landing;