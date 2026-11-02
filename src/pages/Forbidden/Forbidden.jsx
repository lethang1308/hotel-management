import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import { ROUTES } from '@/constants/routes';

export const Forbidden = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      <div className="w-16 h-16 rounded-2xl bg-destructive/10 text-destructive flex items-center justify-center mb-6">
        <ShieldAlert className="w-8 h-8" />
      </div>

      <p className="eyebrow mb-2">Error 403</p>
      <h1 className="font-display text-4xl sm:text-5xl text-primary mb-3">Access Restricted</h1>
      <p className="text-sm text-muted-foreground max-w-md mb-8 leading-relaxed">
        Bạn không có quyền hạn cần thiết để truy cập khu vực này. Vui lòng đăng nhập bằng tài khoản quản lý hoặc liên hệ bộ phận hỗ trợ.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-2xl border border-border bg-white px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-primary/40 hover:text-primary"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại
        </button>
        <button
          type="button"
          onClick={() => navigate(ROUTES.HOME)}
          className="inline-flex items-center gap-2 rounded-2xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-mid"
        >
          <Home className="w-4 h-4" />
          Về trang chủ
        </button>
      </div>
    </div>
  );
};

export default Forbidden;
