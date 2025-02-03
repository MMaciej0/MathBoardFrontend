import { createContext, useContext, useState } from 'react'

type ToolContextType = {
  activeTool: string
  setActiveTool: (tool: string) => void
}

const ToolContext = createContext<ToolContextType | undefined>(undefined)

export const ToolProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeTool, setActiveTool] = useState('cursor')
  
  return (
    <ToolContext.Provider value={{ activeTool, setActiveTool }}>
      {children}
    </ToolContext.Provider>
  )
}

export const useToolContext = () => {
  const context = useContext(ToolContext)
  if (!context) {
    throw new Error('useToolContext must be used within a ToolProvider')
  }
  return context
}