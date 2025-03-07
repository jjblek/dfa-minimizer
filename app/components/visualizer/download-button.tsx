import React from 'react';
import {
    useReactFlow,
    getViewportForBounds,
    ControlButton,
} from '@xyflow/react';
import { toPng } from 'html-to-image';
import { MdDownload } from 'react-icons/md';
function downloadImage(dataUrl: string) {
    const a = document.createElement('a');
    
    a.setAttribute('download', 'minimized-dfa.png');
    a.setAttribute('href', dataUrl);
    a.click();
    }
    
    const imageWidth = 1024;
    const imageHeight = 768;
    
    function DownloadButton() {
    const { getNodes, getNodesBounds } = useReactFlow();
    const onClick = () => {
        // we calculate a transform for the nodes so that all nodes are visible
        // we then overwrite the transform of the `.react-flow__viewport` element
        // with the style option of the html-to-image library
        const nodesBounds = getNodesBounds(getNodes());
        const viewport = getViewportForBounds(
            nodesBounds,
            imageWidth,
            imageHeight,
            0.5,
            2,
            0.25
        );
    
        toPng(document.querySelector('.react-flow__viewport') as HTMLElement, {
            backgroundColor: 'transparent',
            width: imageWidth,
            height: imageHeight,
            style: {
                transform: `translate(${viewport.x}px, ${viewport.y}px) scale(${viewport.zoom})`,
            },
        }).then(downloadImage);
    };
    
    return (
        <ControlButton title='download png' className='' onClick={onClick}>
            <MdDownload/>
        </ControlButton>
    );
}

export default DownloadButton;