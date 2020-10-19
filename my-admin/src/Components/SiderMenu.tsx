import { MenuProps } from 'antd/lib/menu'
import React, { useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

type SiderMenuProps = MenuProps & {
  menus: any;
  onClick: (e: any) => void;
  selectedKeys: string[];
  openKeys?: string[];
  onOpenChange: (v: string[]) => void;
};
export default function SiderMenu({menus, ...props}: SiderMenuProps) {
  const [list, setList] = useState<any[]>([])
  const onDragEnd = () => {

  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="sider-menu">
        {
          (provided, snapshot) => {
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {
                list.map((item: IFItem, index: number) => {
                  
                })
              }
            </div>
          }
        }
      </Droppable>
    </DragDropContext>
  )
}
