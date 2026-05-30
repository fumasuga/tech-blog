export function ThemeScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          (function() {
            function applyTheme(isDark) {
              var root = document.documentElement;
              if (isDark) {
                root.classList.add('dark');
                root.setAttribute('data-theme', 'dark');
              } else {
                root.classList.remove('dark');
                root.setAttribute('data-theme', 'light');
              }
            }
            var theme = localStorage.getItem('theme');
            applyTheme(
              theme === 'dark' ||
                (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
            );
          })();
        `,
      }}
    />
  );
}
