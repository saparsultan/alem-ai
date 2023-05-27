import React from "react"
import ContentLoader from "react-content-loader"

const StylesLoader = (props) => (
    <ContentLoader
        speed={2}
        width={100}
        height={100}
        viewBox="0 0 100 100"
        backgroundColor="#8e2de2"
        foregroundColor="#4a00e0"
        title="Загрузка стилей..."
        {...props}
    >
        <rect x="159" y="284" rx="0" ry="0" width="1" height="1"/>
        <rect x="0" y="-1" rx="8" ry="8" width="100" height="100"/>
    </ContentLoader>
)

export default StylesLoader