import type {ReactNode} from 'react';

interface ScreenshotPlaceholderProps {
  description: string;
  platform?: string;
  aspectRatio?: string;
}

export default function ScreenshotPlaceholder({
  description,
  platform,
  aspectRatio,
}: ScreenshotPlaceholderProps): ReactNode {
  const style = aspectRatio ? {aspectRatio} : {};

  return (
    <div className="screenshot-placeholder" style={style}>
      <span className="screenshot-placeholder__icon">&#128247;</span>
      <span className="screenshot-placeholder__description">{description}</span>
      {platform && (
        <span className="screenshot-placeholder__platform">{platform}</span>
      )}
      <span className="screenshot-placeholder__label">Screenshot coming soon</span>
    </div>
  );
}
