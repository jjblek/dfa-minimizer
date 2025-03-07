import { BezierEdge, EdgeProps, BaseEdge, EdgeLabelRenderer } from '@xyflow/react'; // Use BezierEdge if BaseEdge is unavailable
import { memo } from "react";

interface SelfConnectingProps extends EdgeProps {
    theme: string;
}
// Custom Self-Connecting Edge component
function SelfConnecting (props: SelfConnectingProps) {
    if (props.source !== props.target) {
        return <BezierEdge {...props} />;
    }
    
    const { source, target, sourceX, sourceY, targetX, targetY, id, markerEnd, label, theme } = props;

    // Custom positions for the self-connecting edge based on Position enum
    const radiusX = 30; // Control the width of the loop
    const radiusY = 30; // Control the height of the loop

    // You can get the positions from the Position API, such as:
    // Position.Top, Position.Bottom, Position.Left, Position.Right, etc.

    const customSourceX = sourceX + 0; // Offset for source position (can adjust as needed)
    const customSourceY = sourceY + 0; // Offset for source position (can adjust as needed)

    const customTargetX = targetX + 30; // Offset for target position (can adjust as needed)
    const customTargetY = targetY + 30; // Offset for target position (can adjust as needed)

    // Create the path for the loop
    const edgePath = `M ${customSourceX} ${customSourceY} A ${radiusX} ${radiusY} 0 1 0 ${customTargetX+2.5} ${customTargetY+2}`;
    
    // Offset for the label to position it near the loop
    const labelX = sourceX + 40 ;
    const labelY = sourceY + 10; // Adjust for better spacing

    return (
        <>
            <BaseEdge id={id} path={edgePath} markerEnd={markerEnd} 
                style={theme === 'dark' ? 
                    {stroke: props.selected ? '#ccc' : '#fff'} : 
                    {stroke: props.selected ? '#555' : '#b1b1b7'}
                }
            />
            {label && (
            <EdgeLabelRenderer>
                <div
                    style={{
                        transform: `translate(-10%, -20%) translate(${labelX}px, ${labelY}px)`,
                        backgroundColor: theme === 'dark' ? "#2b2b2b" : 'white',
                        padding: "2px 6px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        border: "1px solid black",
                    }}
                    className="edge-label-renderer__custom-edge nodrag nopan absolute"
                >
                    {label}
                </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
};

export default memo(SelfConnecting)