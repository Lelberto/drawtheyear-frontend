import { useQuery } from './query.hook';

export const useAttachmentManager = () => {
  const query = useQuery();

  const download = async (attachmentId: string) => {
    return await query.attachments.download(attachmentId);
  }

  const stream = async (attachmentId: string) => {
    return await query.attachments.stream(attachmentId);
  }

  return {
    stream,
    download
  };
}
