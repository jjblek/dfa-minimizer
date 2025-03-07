import {
    getBezierPath,
    useInternalNode,
    EdgeLabelRenderer,
    useStore,
    ReactFlowState,
    EdgeProps,
    BaseEdge,
} from "@xyflow/react";

import { getEdgeParams } from "./utils";
import { useTheme } from "next-themes";
import { memo } from "react";
export type GetSpecialPathParams = {
    sourceX: number;
    sourceY: number;
    targetX: number;
    targetY: number;
};

// Function to create a curved path for bi-directional edges
export const getSpecialPath = ({ sourceX, sourceY, targetX, targetY }: GetSpecialPathParams, offset: number) => {

    const centerX = (sourceX + targetX) / 2;
    const centerY = (sourceY + targetY) / 2;

    return `M ${sourceX} ${sourceY} Q ${centerX} ${centerY + offset} ${targetX} ${targetY}`;
};

function FloatingEdge(props: EdgeProps) {
    const { theme } = useTheme();
    const { source, target, id, markerEnd, label, style } = props;

    const sourceNode = useInternalNode(source);
    const targetNode = useInternalNode(target);

    if (!sourceNode || !targetNode) { return null; }

    const { sx, sy, tx, ty, sourcePos, targetPos } = getEdgeParams(sourceNode, targetNode);

    // Check if the edge is bi-directional
    const isBiDirectionalEdge = useStore((s: ReactFlowState) =>
        s.edges.some((e) =>
            (e.source === target && e.target === source) ||
            (e.target === source && e.source === target)
        )
    );

    // Adjust curve offset for bi-directional edges
    const offset = 30; // Adjust to control curve spacing
    let edgePath, labelX, labelY;

    if (isBiDirectionalEdge) {
        edgePath = getSpecialPath({ sourceX: sx, sourceY: sy, targetX: tx, targetY: ty }, sx < tx ? offset : -offset);
        
        // Center label at the midpoint of the edge
        labelX = (sx + tx) / 2;
        labelY = (sy + ty) / 2;
        
        // Push labels apart vertically to avoid overlap
        const labelOffset = sx < tx ? 15 : -15; // Shift labels in opposite directions
        labelY += labelOffset;
    } else {
        [edgePath, labelX, labelY] = getBezierPath({
            sourceX: sx,
            sourceY: sy,
            sourcePosition: sourcePos,
            targetPosition: targetPos,
            targetX: tx,
            targetY: ty,
        });
    }

    return (
        <>
            {/* Edge Path */}
            <BaseEdge path={edgePath} markerEnd={markerEnd} 
                style={theme === 'dark' ? 
                    {stroke: props.selected ? '#ccc' : '#fff'} : 
                    {stroke: props.selected ? '#555' : '#b1b1b7'}
                }
            />

            {/* Edge Label */}
            {label && (
                <EdgeLabelRenderer>
                    <div
                        style={{
                            transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
                            backgroundColor: theme === 'dark' ? "#2b2b2b" : 'white',
                            padding: "2px 6px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            border: "1px solid black",
                            userSelect: "none",
                        }}
                        className="edge-label-renderer__custom-edge nodrag nopan absolute"
                    >
                        {label}
                    </div>
                </EdgeLabelRenderer>
            )}
        </>
    );
}

export default memo(FloatingEdge);