import React, { memo } from "react";
import { Handle, Position } from "@xyflow/react";

// Define the expected structure of the data prop
interface CustomNodeData {
    data:{
        label: string;
    }
}

// Correctly type the component using NodeProps
const CustomNode: React.FC<CustomNodeData> = ({ data }) => {
    return (
        <>
        {data.label}
        <Handle type="source" position={Position.Top} id="a" />
        <Handle type="source" position={Position.Right} id="b" />
        <Handle type="source" position={Position.Bottom} id="c" />
        <Handle type="source" position={Position.Left} id="d" />
        </>
    );
};

export default memo(CustomNode);
