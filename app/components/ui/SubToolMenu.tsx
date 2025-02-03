import { useEffect } from 'react'
import type { Tool } from '@/constants/toolbox'
import { cn } from '@/lib/utils'

type SubToolMenuProps = {
    subTools: Tool[]
    activeTool: string
    onSelect: (tool: string) => void
}

export function SubToolMenu({ subTools, activeTool, onSelect }: SubToolMenuProps) {
    return (
        <div className="absolute left-full top-0 bg-gray-800 rounded shadow-md">
            {subTools.map(subTool => (
                <button
                    key={subTool.id}
                    className={cn(
                        'text-white px-4 py-2 hover:bg-gray-700 w-full text-left flex items-center space-x-2',
                        activeTool === subTool.id && 'ring-2 ring-blue-500'
                    )}
                    title={subTool.label}
                    onClick={() => onSelect(subTool.id)}
                >
                    <subTool.icon className="w-4 h-4" />
                    <span>{subTool.label}</span>
                </button>
            ))}
        </div>
    )
}
