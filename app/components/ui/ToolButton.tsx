import type { Tool } from '@/constants/toolbox'
import { cn } from '@/lib/utils'
type ToolButtonProps = {
    tool: Tool
    isActive?: boolean
    onClick: (tool: string) => void
}

export function ToolButton({ isActive, tool, onClick }: ToolButtonProps) {
    return (
        <button
            className={cn(
                "bg-gray-700 text-white p-2 mr-2 rounded hover:bg-gray-600 w-10 h-10 flex items-center justify-center",
                isActive && "ring-2 ring-blue-500"
              )}
            title={tool.label}
            onClick={() => onClick(tool.id)}
        >
            <tool.icon className="w-5 h-5" />
        </button>
    )
}
