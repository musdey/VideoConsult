import React, { useState, useEffect } from 'react';
import ProgressComponent from '@material-ui/core/CircularProgress';

function JitsiMeetComponent() {
    const [loading, setLoading] = useState(true);
    const containerStyle = {
        width: '800px',
        height: '400px',
    };

    const jitsiContainerStyle = {
        display: (loading ? 'none' : 'block'),
        width: '100%',
        height: '100%',
    }

    const loadJitsiScript = () =>
        new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://meet.jit.si/external_api.js";
            script.async = true;
            script.onload = resolve
            document.body.appendChild(script);
        });

    function startConference() {
        try {
            const domain = 'localhost:8443';
            const options: JitsiMeetOptions = {
                roomName: 'roomName',
                height: 400,
                parentNode: document.getElementById('jitsi-container'),
                interfaceConfigOverwrite: {
                    filmStripOnly: false,
                    SHOW_JITSI_WATERMARK: false,
                },
                configOverwrite: {
                    disableSimulcast: false,
                },
            };

            const api = new JitsiMeetExternalAPI(domain, options);
            api.addEventListener('videoConferenceJoined', () => {
                console.log('Local User Joined');
                setLoading(false);
                api.executeCommand('displayName', 'MyName');
            });
            api.captureLargeVideoScreenshot()
        } catch (error) {
            console.error('Failed to load Jitsi API', error);
        }
    }

    useEffect(() => {
        loadJitsiScript().then(() => {
            // verify the JitsiMeetExternalAPI constructor is added to the global..
            if ((window as any).JitsiMeetExternalAPI) startConference();
            else alert('Jitsi Meet API script not loaded');
        })

    }, []);

    return (
        <div
            style={containerStyle}
        >
            {loading && <ProgressComponent />}
            <div
                id="jitsi-container"
                style={jitsiContainerStyle}
            />
        </div>
    );
}

export default JitsiMeetComponent;