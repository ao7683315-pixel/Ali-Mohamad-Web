/**
 * Utility to generate and download a clean RFC-compliant vCard (v3.0) file
 * for Ali Mohamad containing exclusively his verified contact details.
 */
export function downloadVCard() {
  const vcardContent = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Mohamad;Ali;;;',
    'FN:Ali Mohamad',
    'TITLE:Cybersecurity Student & Computer Science Engineer',
    'TEL;TYPE=CELL,VOICE:01023497715',
    'EMAIL;TYPE=PREF,INTERNET:ao7683315@gmail.com',
    'URL:https://www.linkedin.com/in/ali-omar-ab5503395',
    'NOTE:Cybersecurity Student & Computer Science Engineer. Dedicated to secure architecture and software craftsmanship.',
    'REV:' + new Date().toISOString(),
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vcardContent], { type: 'text/vcard;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'Ali_Mohamad_Contact.vcf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
