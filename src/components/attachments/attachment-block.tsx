import { useEffect, useMemo, useState } from 'react';
import { useAttachmentManager } from '../../hooks/attachment.hook'
import { Attachment } from '../../types/data.types';

type AttachmentBlockProps = {
  attachment: Attachment;
}

export const AttachmentBlock = ({ attachment }: AttachmentBlockProps) => {
  const attachmentManager = useAttachmentManager();
  const [attachmentData, setAttachmentData] = useState<string>();

  const dataElement = useMemo(() => {
    const { mimeType } = attachment;
    if (mimeType?.startsWith('image')) {
      return (<img src={attachmentData} alt={attachment.name} width={96} />);
    }
    return (<>No data</>);
  }, [attachment, attachmentData]);

  useEffect(() => {
    attachmentManager.download(attachment.id)
      .then(res => setAttachmentData(res.data))
      .catch(err => console.error('Could not load attachment data :', err));
  }, [attachment]);

  return (
    <div>
      <span>{attachment.name}</span>
      <div>
        {dataElement}
      </div>
    </div>
  );
}
