import * as React from "react"
// Generic

export interface DefaultElement {
    content: string
    secureUrl?: string
    type?: string
    MIMEType?: string
}

export interface Profile extends DefaultElement {
    type: "profile"
    firstName?: string
    lastName?: string
    username?: string
    gender?: string
}

// Music

export interface Album extends DefaultElement {
    type: "album"
    song: string   // URL to a page containing Song metadata
    disc?: number
    track?: number
    musician?: string[] // URLs to pages containing a Profile metadata
    releaseDate?: string
}

export interface Song extends DefaultElement {
    type: "song"
    duration?: number
    disc?: number
    track?: number
    album: string  // URL to a page containing an Album metadata
    musician?: string[] // URLs to pages containing a Profile metadata
}

export interface Playlist extends DefaultElement {
    type: "playlist"
    song?: string  // URL to a page containing Song metadata
    disc?: number
    track?: number
    creator: string  // URL to a page containing a Profile metadata
}

export interface RadioStation extends DefaultElement {
    type: "radio_station"
    creator?: string  // URL to a page containing a Profile metadata
}

// Video

export interface Actor {
    profile: string  // URL to a page containing a Profile metadata
    role?: string
}

export interface Movie extends DefaultElement {
    type: "movie"
    actor?: Actor[]
    director?: string[] // URLs to pages containing a Profile metadata
    writer?: string[] // URLs to pages containing a Profile metadata
    duration?: number
    releaseDate?: string
    tag?: string[]
}

export interface TVShow extends Movie {
    type: "tv_show"
}

export interface OtherVideo extends Movie {
    type: "other"
}

export interface Episode extends Movie {
    type: "episode"
    series?: string // URL to a page containing a tv_show metadata
}

export interface Audio extends DefaultElement {
    type: "audio"
}

export interface Video extends DefaultElement {
    type: "video"
    width?: number
    height?: number
    alt:? string
    element?: Movie | TVShow | Episode | OtherVideo
}

export interface Image extends DefaultElement {
    type: "image"
    width?: number
    height?: number
    alt?: string
}

export interface Music extends DefaultElement {
    type: "music"
    element?: Album | Song | Playlist | RadioStation
}

export interface Article extends DefaultElement {
    type: "article"
    publishedTime?: string
    modifiedTime?: string
    expirationTime?: string
    author?: string  // URL to a page containing a Profile metadata
    section?: string
    tag?: string[]
}

export interface Book extends DefaultElement {
    type: "book"
    author?: string[] // URLs to pages containing a Profile metadata
    isbn?: string
    releaseDate?: string
    tag?: string[]
}

export interface Website extends DefaultElement {
    type: "website"
}

export interface OpenGraphProps {
    title: string
    content: DefaultElement | Website | Book | Article | Music | Audio | Image | Video | Profile
    image: Image[]
    url: string
    audio?: Audio[]
    video?: Video[]
    description?: string
    determiner?: "" | "a" | "an" | "the" | "auto"
    locale?: string
    localeAlternate?: string[]
    siteName?: string
}

declare const OpenGraph: React.FC<{locationRelativeToWorkingDirectory: string}>