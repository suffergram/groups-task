import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  memo,
  useCallback,
} from "react";
import { Select } from "@vkontakte/vkui";
import { Group } from "../../interfaces/group";
import { closedOptions, initOption } from "../../data/options";
import { Filter } from "../../types/filter";
import { User } from "../../interfaces/user";
import "@vkontakte/vkui/dist/vkui.css";
import "./style.css";

type ControlsProps = {
  groups?: Group[];
  users?: User[];
  colors?: string[];
  onChange: Dispatch<SetStateAction<Filter>>;
};

export const Controls = memo(({ users, colors, onChange }: ControlsProps) => {
  const handleClosedChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const closedStatus: Record<string, boolean | undefined> = {
        "-1": undefined,
        "1": true,
        "0": false,
      };

      onChange((prev) => ({
        ...prev,
        closed: closedStatus[event.target.value],
      }));
    },
    []
  );

  const handleColorChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      onChange((prev) => ({
        ...prev,
        color: event.target.value,
      }));
    },
    []
  );

  const handleUserChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      onChange((prev) => ({
        ...prev,
        user: event.target.value,
      }));
    },
    []
  );

  return (
    <div className="controls">
      <Select
        placeholder="приватность"
        options={closedOptions}
        onChange={handleClosedChange}
      />

      <Select
        placeholder="цвет аватарки"
        options={
          colors
            ? colors.map((color) => ({
                label: color,
                value: color,
              }))
            : initOption
        }
        onChange={handleColorChange}
      />

      <Select
        placeholder="имя друга"
        options={
          users
            ? users.map((user) => ({
                label: `${user.first_name} ${user.last_name}`,
                value: `${user.first_name}${user.last_name}`,
              }))
            : initOption
        }
        onChange={handleUserChange}
      />
    </div>
  );
});
