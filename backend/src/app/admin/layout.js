
import ADMINUI from '@/components/adminui/page';
import ContentWraper from '@/components/adminui/ContentWraper';

export default function AdminLayout({ children }) {

  return (
    <div>
        <ADMINUI>
            <ContentWraper>
      {children}
      </ContentWraper>
      </ADMINUI>
    </div>
  );
}
