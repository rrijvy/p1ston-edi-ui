"use client";

import ReactJson, { ReactJsonViewProps } from "@microlink/react-json-view";
import { IEmailFileDto } from "@/core/models/dtos/IEmaiDto";
import { EmailFileType } from "@/helpers/enums";

type Props = {
  renderItem: Array<IEmailFileDto>;
  dbItems: Array<IEmailFileDto>;
};

const EmailDataTable = (props: Props) => {
  const jsonViewerConfig: Omit<ReactJsonViewProps, "src"> = {
    theme: "monokai",
    displayDataTypes: false,
    iconStyle: "square",
    displayObjectSize: false,
    indentWidth: 2,
    collapsed: 2,
    collapseStringsAfterLength: 20,
    enableClipboard: true,
  };

  return (
    <table className="w-full border border-slate-500">
      <caption className="caption-top">EMAIL DATA</caption>
      <thead>
        <tr>
          <th className="border border-slate-600 bg-stone-600 text-white w-2/5 p-2">Email Data</th>
          <th className="border border-slate-600 bg-stone-600 text-white w-2/5 p-2">Email Attachment</th>
        </tr>
      </thead>
      <tbody>
        {props.renderItem.map((x) => {
          const correspondingAttachment = props.dbItems.filter(
            (z) => x.p1stonType && z.p1stonType && z.p1stonType.startsWith(x.p1stonType) && z.fileType === EmailFileType.EmailAttachment
          );
          return (
            <tr key={x.p1stonType}>
              <td className="border border-slate-700 align-top p-2 text-wrap">
                <ReactJson src={x} {...jsonViewerConfig} />
              </td>
              <td className="border border-slate-700 align-top p-2 text-wrap">
                <ReactJson src={correspondingAttachment} {...jsonViewerConfig} />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EmailDataTable;
