import { useState } from "react";
import CreateOptionButton from "./CreateOptionButton";

const SidebarCreate = () => {
  const [open, setOpen] = useState(true);


  return (
    <div className={`mx-4 ${open ? "mb-4" : ""} mt-auto flex flex-col border-t`}>
      <div
        tabIndex={0}
        role="button"
        className="pointer my-2 flex items-center py-2 pl-3 pr-2.5"
        aria-expanded="true"
        onClick={() => setOpen(!open)}
      >
        <span className="strong text-size-large flex-auto truncate">
          Create...
        </span>
        <svg width="16" height="16" viewBox="0 0 16 16" className="flex-none">
          <use
            fill="currentColor"
            href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ChevronDown"
          ></use>
        </svg>
      </div>
      {open && (
        <div className="create-options flex flex-col">
          <div className="flex flex-col items-center">
            <CreateOptionButton title="Grid">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="text-darken4 flex-none"
              >
                <use
                  fill="rgb(22, 110, 225)"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#GridFeature"
                ></use>
              </svg>
            </CreateOptionButton>
            <CreateOptionButton title="Calender">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="text-darken4 flex-none"
              >
                <use
                  fill="rgb(213, 68, 1)"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#CalendarFeature"
                ></use>
              </svg>
            </CreateOptionButton>
            <CreateOptionButton title="Gallery">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="text-darken4 flex-none"
              >
                <use
                  fill="rgb(124, 55, 239)"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#GalleryFeature"
                ></use>
              </svg>
            </CreateOptionButton>
            <CreateOptionButton title="Kanban">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="text-darken4 flex-none"
              >
                <use
                  fill="rgb(4, 138, 14)"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#KanbanFeature"
                ></use>
              </svg>
            </CreateOptionButton>
            <CreateOptionButton title="Timeline">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="text-darken4 flex-none"
              >
                <use
                  fill="rgb(220, 4, 59)"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#TimelineFeature"
                ></use>
              </svg>
            </CreateOptionButton>
            <CreateOptionButton title="List">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="text-darken4 flex-none"
              >
                <use
                  fill="rgb(13, 82, 172)"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#ListFeature"
                ></use>
              </svg>
            </CreateOptionButton>
            <CreateOptionButton title="Gant">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="text-darken4 flex-none"
              >
                <use
                  fill="rgb(13, 127, 120)"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Gantt"
                ></use>
              </svg>
            </CreateOptionButton>
            <CreateOptionButton title="New section" />
          </div>
          <div className="form-btn border-t pt-2 mt-2">
            <CreateOptionButton title="Form">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="text-darken4 flex-none"
              >
                <use
                  fill="rgb(221, 4, 168)"
                  href="/icons/icon_definitions.svg?v=68b23d569e0a0c2f5529fd9b824929e7#Form"
                ></use>
              </svg>
            </CreateOptionButton>
          </div>
        </div>
      )}
    </div>
  );
};

export default SidebarCreate;
