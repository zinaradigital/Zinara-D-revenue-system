export function createBreadcrumbs() {
  const breadcrumbs = window.router.generateBreadcrumbs();
  
  if (breadcrumbs.length <= 1) return '';
  
  const breadcrumbHtml = breadcrumbs.map((crumb, index) => {
    const isLast = index === breadcrumbs.length - 1;
    return `
      <li class="breadcrumb-item ${isLast ? 'active' : ''}">
        ${isLast ? 
          `<span class="breadcrumb-current">${crumb.title}</span>` :
          `<a href="${crumb.path}" class="breadcrumb-link">${crumb.title}</a>`
        }
      </li>
    `;
  }).join('');
  
  return `
    <nav class="breadcrumbs" aria-label="Breadcrumb navigation">
      <ol class="breadcrumb-list">
        ${breadcrumbHtml}
      </ol>
    </nav>
  `;
}
