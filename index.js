import * as React from "react"
const path = require("path")
const fs = require("fs")
const process = require("process")

const generateTag = (property, content) => {
    return React.createElement(
        "meta",
        {
            property: `og:${property}`,
            content: `${content}`
        },
        {}
    )
}
  
const getMetadata = (locationRelativeToWorkingDirectory) => {
    return JSON.parse(
        fs.readFileSync(
        resolve(
            process.cwd(), locationRelativeToWorkingDirectory, parse(__filename).name, ".json"
        )
        ).toString()
    )
} 

const generateRequiredElements = (metadata) => {
    const children = []
    if (metadata.title) { children.push(generateTag("title", metadata.title)) }
    if (metadata.type) {
        if (metadata.content.type !== ("video" | "music")) {
            children.push(generateTag("type", metadata.content.type))
        } else {
            children.push(generateTag("type", `${metadata.content.type}.${metadata.content.element.type}`))
        }
    }
    if (metadata.url) {children.push(generateTag("url", metadata.url))}
    if (metadata.image) {
        metadata.image.forEach((image) => {
            children.push(generateTag("image", image.content))
            if (image.secureUrl) { children.push(generateTag("image:secure_url", image.secureUrl)) }
            if (image.MIMEType) { children.push(generateTag("image:type", image.MIMEType)) }
            if (image.width) { children.push(generateTag("image:width", image.width)) }
            if (image.height) { children.push(generateTag("image:height", image.height)) }
            if (image.alt) { children.push(generateTag("image:alt", image.alt)) }
        })
    }
    return children
}

const generateOptativeElements = (metadata) => {
    const children = []

    if (metadata.audio) {
        metadata.audio.forEach((audio) => {
            children.push(generateTag("audio", audio.content))
            if (audio.secureUrl) { children.push(generateTag("audio:secure_url", audio.secureUrl)) }
            if (audio.MIMEType) { children.push(generateTag("audio:type", audio.MIMEType)) }
        })
    }
    if (metadata.video) {
        metadata.video.forEach((video) => {
            children.push(generateTag("video", video.content))
            if (video.secureUrl) { children.push(generateTag("video:secure_url", video.secureUrl)) }
            if (video.MIMEType) { children.push(generateTag("video:type", video.MIMEType)) }
            if (video.width) { children.push(generateTag("video:width", video.width)) }
            if (video.height) { children.push(generateTag("video:height", video.height)) }
            if (video.alt) { children.push(generateTag("video:alt", video.alt)) }
        })
    }
    if (metadata.description) { children.push(generateTag("description", metadata.description)) }
    if (metadata.determiner) { children.push(generateTag("determiner", metadata.determiner)) }
    if (metadata.locale) { children.push(generateTag("locale", metadata.locale)) }
    if (metadata.localeAlternate) {
        metadata.localeAlternate.forEach((locale) => {
            children.push(generateTag("locale:alternate", locale))
        })
    }
    if (metadata.siteName) { children.push(generateTag("site_name", metadata.siteName)) }

    return children
}

const generateProfileElements = (metadata) => {
    const children = []

    if (metadata.content.type === "profile") {
        const profile = metadata.content
        children.push(generateTag("profile", profile.content))
        if (profile.secureUrl) { children.push(generateTag("profile:secure_url", profile.secureUrl)) }
        if (profile.MIMEType) { children.push(generateTag("profile:type", profile.MIMEType)) }
        if (profile.firstName) { children.push(generateTag("profile:first_name", profile.firstName)) }
        if (profile.lastName) { children.push(generateTag("profile:last_name", profile.lastName)) }
        if (profile.username) { children.push(generateTag("profile:username", profile.username)) }
        if (profile.gender) { children.push(generateTag("profile:gender", profile.gender)) }
    }
    
    return children
}

const generateBookElements = (metadata) => {
    const children = []

    if (metadata.content.type === "book") {
        const book = metadata.content
        children.push(generateTag("book", book.content))
        if (book.secureUrl) { children.push(generateTag("book:secure_url", book.secureUrl)) }
        if (book.MIMEType) { children.push(generateTag("book:type", book.MIMEType)) }
        if (book.isbn) { children.push(generateTag("book:isbn", book.isbn)) }
        if (book.releaseDate) { children.push(generateTag("book:release_date", book.releaseDate)) }
        if (book.author) {
            book.author.forEach((author) => {
                children.push(generateTag("book:author", author))
            })
        }
        if (book.tag) { 
            book.tag.forEach((tag) => {
                children.push(generateTag("book:tag", tag))
            })
        }
    }

    return children
}

const generateArticleElements = (metadata) => {
    const children = []

    if (metadata.content.type === "article") {
        const article = metadata.content
        children.push(generateTag("article", article.content))
        if (article.secureUrl) { children.push(generateTag("article:secure_url", article.secureUrl)) }
        if (article.MIMEType) { children.push(generateTag("article:type", article.MIMEType)) }
        if (article.publishedTime) { children.push(generateTag("article:published_time", article.publishedTime)) }
        if (article.modifiedTime) { children.push(generateTag("article:modified_time", article.modifiedTime)) }
        if (article.expirationTime) { children.push(generateTag("article:expiration_time", article.expirationTime)) }
        if (article.section) { children.push(generateTag("article:section", article.section)) }
        if (article.author) { 
            article.author.forEach((author) => {
                children.push(generateTag("article:author", author))
            })
        }
        if (article.tag) { 
            article.tag.forEach((tag) => {
                children.push(generateTag("article:tag", tag))
            })
        }
    }

    return children
}

const generateDetailedVideoElements = (metadata) => {
    const children = []

    const video = metadata.content
    children.push(generateTag("video", video.content))
    if (video.secureUrl) { children.push(generateTag("video:secure_url", video.secureUrl)) }
    if (video.MIMEType) { children.push(generateTag("video:type", video.MIMEType)) }
    if (video.actor) { 
        video.actor.forEach((actor) => {
            if (actor.profile) { children.push(generateTag("video:actor", actor.profile)) }
            if (actor.role) { children.push(generateTag("video:actor:role", actor.role)) }
        })
    }
    if (video.director) { 
        video.director.forEach((director) => {
            children.push(generateTag("video:director", director))
        })
    }
    if (video.writer) { 
        video.writer.forEach((writer) => {
            children.push(generateTag("video:writer", writer))
        })
    }
    if (video.duration) { children.push(generateTag("video:duration", video.duration)) }
    if (video.releaseDate) { children.push(generateTag("video:release_date", video.releaseDate)) }
    if (video.tag) { 
        video.tag.forEach((tag) => {
            children.push(generateTag("video:tag", tag))
        })
    }

    return children
}

const generateMovieElements = (metadata) => {
    if (metadata.content.type === "movie") { return generateDetailedVideoElements(metadata) }
}

const generateEpisodeElements = (metadata) => {
    const children = []

    if (metadata.content.type === "episode") {
        const episode = metadata.content
        children.concat(generateDetailedVideoElements(metadata))
        if (episode.series) { children.push(generateTag("video:release_date", episode.releaseDate)) }
    }

    return children
}

const generateTVShowElements = (metadata) => {
    if (metadata.content.type === "tv_show") { return generateDetailedVideoElements(metadata) }
}

const generateOtherVideoElements = (metadata) => {
    if (metadata.content.type === "other") { return generateDetailedVideoElements(metadata) }
}

const generateSongElements = (metadata) => {
    const children = []

    if (metadata.content.type === "song") {
        const song = metadata.content
        children.push(generateTag("music", song.content))
        if (song.secureUrl) { children.push(generateTag("music:secure_url", song.secureUrl)) }
        if (song.MIMEType) { children.push(generateTag("music:type", song.MIMEType)) }
        if (song.duration) { children.push(generateTag("music:duration", song.duration)) }
        if (song.album) { children.push(generateTag("music:album", song.album)) }
        if (song.disk) { children.push(generateTag("music:album:disk", song.disk)) }
        if (song.track) { children.push(generateTag("music:album:track", song.track)) }
        if (song.musician) { 
            song.musician.forEach((musician) => {
                children.push(generateTag("music:musician", musician))
            })
        }
    }

    return children
}

const generateAlbumElements = (metadata) => {
    const children = []

    if (metadata.content.type === "album") {
        const album = metadata.content
        children.push(generateTag("music", album.content))
        if (album.secureUrl) { children.push(generateTag("music:secure_url", album.secureUrl)) }
        if (album.MIMEType) { children.push(generateTag("music:type", album.MIMEType)) }
        if (album.song) { children.push(generateTag("music:song", album.song)) }
        if (album.disk) { children.push(generateTag("music:song:disk", album.disk)) }
        if (album.track) { children.push(generateTag("music:song:track", album.track)) }
        if (album.musician) { 
            album.musician.forEach((musician) => {
                children.push(generateTag("music:musician", musician))
            })
        }
        if (album.releaseDate) { children.push(generateTag("music:release_date", album.releaseDate)) }
    }

    return children
}

const generatePlaylistElements = (metadata) => {
    const children = []

    if (metadata.content.type === "playlist") {
        const playlist = metadata.content
        children.push(generateTag("music", playlist.content))
        if (playlist.secureUrl) { children.push(generateTag("music:secure_url", playlist.secureUrl)) }
        if (playlist.MIMEType) { children.push(generateTag("music:type", playlist.MIMEType)) }
        if (playlist.song) { children.push(generateTag("music:song", playlist.song)) }
        if (playlist.disk) { children.push(generateTag("music:song:disk", playlist.disk)) }
        if (playlist.track) { children.push(generateTag("music:song:track", playlist.track)) }
        if (playlist.creator) { children.push(generateTag("music:creator", playlist.creator)) }
    }

    return children
}

const generateRadioStationElements = (metadata) => {
    const children = []

    if (metadata.content.type === "radio_station") {
        const radioStation = metadata.content
        children.push(generateTag("music", radioStation.content))
        if (radioStation.secureUrl) { children.push(generateTag("music:secure_url", radioStation.secureUrl)) }
        if (radioStation.MIMEType) { children.push(generateTag("music:type", radioStation.MIMEType)) }
        if (radioStation.creator) { children.push(generateTag("music:creator", radioStation.creator)) }
    }

    return children
}

const generateImageElements = (metadata) => {
    const children = []

    if (metadata.content.type === "image") {
        const image = metadata.content
        children.push(generateTag("image", image.content))
        if (image.secureUrl) { children.push(generateTag("image:secure_url", image.secureUrl)) }
        if (image.MIMEType) { children.push(generateTag("image:type", image.MIMEType)) }
        if (image.width) { children.push(generateTag("image:width", image.width)) }
        if (image.height) { children.push(generateTag("image:height", image.height)) }
        if (image.alt) { children.push(generateTag("image:alt", image.alt)) }
    }

    return children
}

const generateVideoElements = (metadata) => {
    const children = []

    if (metadata.content.type === "video") {
        const video = metadata.content
        children.push(generateTag("video", video.content))
        if (video.secureUrl) { children.push(generateTag("video:secure_url", video.secureUrl)) }
        if (video.MIMEType) { children.push(generateTag("video:type", video.MIMEType)) }
        if (video.width) { children.push(generateTag("video:width", video.width)) }
        if (video.height) { children.push(generateTag("video:height", video.height)) }
        if (video.alt) { children.push(generateTag("video:alt", video.alt)) }
    }

    return children
}

const generateAudioElements = (metadata) => {
    const children = []

    if (metadata.content.type === "audio") {
        const audio = metadata.content
        children.push(generateTag("audio", audio.content))
        if (audio.secureUrl) { children.push(generateTag("audio:secure_url", audio.secureUrl)) }
        if (audio.MIMEType) { children.push(generateTag("audio:type", audio.MIMEType)) }
    }

    return children
}

export const OpenGraph = (locationRelativeToWorkingDirectory) => {
    const metadata = getMetadata(locationRelativeToWorkingDirectory)
    const children = []

    children.concat(generateRequiredElements(metadata))
    children.concat(generateOptativeElements(metadata))

    if (metadata.content.type) {
        children.concat(generateImageElements(metadata))
        children.concat(generateVideoElements(metadata))
        children.concat(generateAudioElements(metadata))
        children.concat(generateProfileElements(metadata))
        children.concat(generateBookElements(metadata))
        children.concat(generateArticleElements(metadata))
        children.concat(generateMovieElements(metadata))
        children.concat(generateEpisodeElements(metadata))
        children.concat(generateTVShowElements(metadata))
        children.concat(generateOtherVideoElements(metadata))
        children.concat(generateSongElements(metadata))
        children.concat(generateAlbumElements(metadata))
        children.concat(generatePlaylistElements(metadata))
        children.concat(generateRadioStationElements(metadata))
    }
    
    return children
}