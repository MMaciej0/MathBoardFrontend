import { useState } from "react"
import { TOOLS, type Tool } from "@/constants/toolbox"
import { ToolButton } from "./ui/ToolButton"
import { SubToolMenu } from "./ui/SubToolMenu"
import { useToolContext } from "@/context/ToolContext";
export function Toolbox() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)
  const { activeTool, setActiveTool } = useToolContext()

  const handleMainToolClick = (tool: Tool) => {                                                            // wybiera narzędzie
    if (tool.subTools?.length) {
      setActiveTool(tool.subTools[0].id)
    } else {
      setActiveTool(tool.id)
    }
  };

  const isToolActive = (tool: Tool) =>                                                                     // wybiera klase do podświetlenia
    activeTool === tool.id || 
    tool.subTools?.some(st => st.id === activeTool)

  return (
    <aside className="fixed left-4 top-1/2 transform -translate-y-1/2 flex flex-col space-y-2 z-20">
      {TOOLS.map((tool: Tool) => {

        return (
          <div
            key={tool.id}
            className="relative"
            onPointerEnter={() => tool.subTools && setOpenMenu(tool.id)}                                   // howa i pokazuje menu
            onPointerLeave={() => tool.subTools && setOpenMenu(null)}
          >
            <ToolButton 
              tool={tool} 
              isActive={isToolActive(tool)}
              onClick={() => handleMainToolClick(tool)}
            />

            {tool.subTools && openMenu === tool.id && (
               <SubToolMenu 
                subTools={tool.subTools} 
                activeTool={activeTool} 
                onSelect={setActiveTool} />
            )}
          </div>
        );
      })}
    </aside>
  );
}
