declare class JitsiMeetExternalAPI {
    constructor(domain:string,options:JitsiMeetOptions)
    addEventListener: (eventName:string, handler:Function) => void
    executeCommand: (command:string, argument:string) => void
    async captureLargeVideoScreenshot: () => {data:{dataUrl:string}}
    getAvailableDevices
    getCurrentDevices
    getContentSharingParticipants
    getLivestreamUrl
    getDisplayName
    getEmail
    getIFrame
    isAudioMuted
    isVideoMuted
    startRecording
    stopRecording
}

interface JitsiMeetOptions {
    roomName?: string,
    width?: number | string,
    height?: number | string,
    parentNode?: HTMLElement | null,
    configOverwrite?: {
        disableSimulcast?: boolean
        startWithAudioMuted?: boolean
    }
    interfaceConfigOverwrite? :{
        filmStripOnly?: boolean,
        SHOW_JITSI_WATERMARK?: boolean,
        DISABLE_DOMINANT_SPEAKER_INDICATOR?: boolean
        TILE_VIEW_MAX_COLUMNS?: 1 | 2 | 3 | 4 | 5
    },
    jwt?: string,
    onload?: Function,
    invitees?: object[],
    devices?: {
        audioInput?: string
        audioOutput?: string
        videoInput?: string
    }
    userInfo?: {
        email?: string,
        displayName?: string
    }
}