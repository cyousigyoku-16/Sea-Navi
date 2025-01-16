import React, { useEffect, useRef } from 'react';

const CameraFroFeed = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const startWebRTCStream = async () => {
            try {
                // 替换为你的 WebRTC 服务地址
                const webSocketURL = "wss://your-webrtc-server.com/stream";
                const connection = new WebSocket(webSocketURL);

                connection.onopen = () => {
                    console.log("WebSocket connection opened");
                };

                connection.onmessage = (event) => {
                    const videoBlob = new Blob([event.data], { type: "video/webm" });
                    const videoURL = URL.createObjectURL(videoBlob);

                    if (videoRef.current) {
                        videoRef.current.src = videoURL;
                        videoRef.current.play();
                    }
                };

                connection.onerror = (error) => {
                    console.error("WebSocket error:", error);
                };
            } catch (error) {
                console.error("Error starting WebRTC stream:", error);
            }
        };


        startWebRTCStream();
    }, []);

    return (
        <div
            style={{
                width: '950px',
                height: '220px',
                backgroundColor: 'yellow',
                overflow: 'hidden',
                border: '1px solid #ccc',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <video
                ref={videoRef}
                autoPlay
                playsInline
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </div>
    );
};

export default CameraFroFeed;

