import { Avatar } from '@/components/Avatar';

export default function AvatarPage() {
  return (
    <div className="min-h-screen bg-background p-8">
      <h1 className="typo-title3 font-semibold text-text-strong mb-8">Avatar</h1>

      {/* Size */}
      <section className="mb-10">
        <h2 className="typo-headline2 font-semibold text-text-primary mb-4">Size</h2>
        <div className="flex items-end gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <Avatar size="xs" initials="AB" />
            <span className="typo-caption1 text-text-secondary">xs (24px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="sm" initials="AB" />
            <span className="typo-caption1 text-text-secondary">sm (32px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="md" initials="AB" />
            <span className="typo-caption1 text-text-secondary">md (40px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" initials="AB" />
            <span className="typo-caption1 text-text-secondary">lg (48px)</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="xl" initials="AB" />
            <span className="typo-caption1 text-text-secondary">xl (56px)</span>
          </div>
        </div>
      </section>

      {/* Shape */}
      <section className="mb-10">
        <h2 className="typo-headline2 font-semibold text-text-primary mb-4">Shape</h2>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" initials="JD" shape="circle" />
            <span className="typo-caption1 text-text-secondary">circle</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" initials="JD" shape="square" />
            <span className="typo-caption1 text-text-secondary">square</span>
          </div>
        </div>
      </section>

      {/* Fallback variants */}
      <section className="mb-10">
        <h2 className="typo-headline2 font-semibold text-text-primary mb-4">Fallback</h2>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <Avatar
              size="lg"
              src="https://i.pravatar.cc/150?img=3"
              alt="사용자 사진"
            />
            <span className="typo-caption1 text-text-secondary">image</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar
              size="lg"
              src="https://invalid-url.example.com/img.jpg"
              alt="에러 이미지"
              initials="EJ"
            />
            <span className="typo-caption1 text-text-secondary">img error → initials</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" initials="김이" />
            <span className="typo-caption1 text-text-secondary">initials</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" />
            <span className="typo-caption1 text-text-secondary">icon fallback</span>
          </div>
        </div>
      </section>

      {/* Status dot */}
      <section className="mb-10">
        <h2 className="typo-headline2 font-semibold text-text-primary mb-4">Status</h2>
        <div className="flex items-center gap-6 flex-wrap">
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" initials="ON" status="online" />
            <span className="typo-caption1 text-text-secondary">online</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" initials="OF" status="offline" />
            <span className="typo-caption1 text-text-secondary">offline</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" initials="BS" status="busy" />
            <span className="typo-caption1 text-text-secondary">busy</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <Avatar size="lg" initials="AW" status="away" />
            <span className="typo-caption1 text-text-secondary">away</span>
          </div>
        </div>
      </section>

      {/* Status with image */}
      <section className="mb-10">
        <h2 className="typo-headline2 font-semibold text-text-primary mb-4">Status + Image</h2>
        <div className="flex items-center gap-6 flex-wrap">
          {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
            <div key={size} className="flex flex-col items-center gap-2">
              <Avatar
                size={size}
                src="https://i.pravatar.cc/150?img=5"
                alt="사용자"
                status="online"
              />
              <span className="typo-caption1 text-text-secondary">{size}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
