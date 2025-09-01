// TODO: Get Data from the Backend API

import { DnsResult, HttpResult, ScanResult } from "@/lib/data";

export const domainData = [
	{
		domainName: "example.com",
		ipAddress: "93.184.216.34",
		isp: "hatway",
	},
	{
		domainName: "openai.com",
		ipAddress: "104.18.7.218",
		isp: "you network",
	},
	{
		domainName: "github.com",
		ipAddress: "140.82.114.3",
		isp: "jio network",
	},
];

export const scanData: ScanResult[] = [
	{
		subEnum: "admin.example.com, mail.example.com",
		dirBF: "/admin, /login, /dashboard, /admin, /login, /dashboard",
		port: "80, 443, 8080",
		services: "HTTP/Apache 2.4.51, HTTPS/Nginx 1.18.0",
		techStack: "React, Node.js, MongoDB",
	},
	{
		subEnum: "api.example.com, dev.example.com",
		dirBF: "/api, /test, /v1, /admin, /login, /dashboard",
		port: "22, 3000, 5000",
		services: "SSH/OpenSSH 8.2, Node.js/Express",
		techStack: "Express.js, PostgreSQL",
	},
	{
		subEnum: "blog.example.com",
		dirBF: "/blog, /wp-admin, /wp-login",
		port: "443",
		services: "HTTPS/Apache 2.4.53",
		techStack: "WordPress, PHP, MySQL",
	},
	{
		subEnum: "cdn.example.com, static.example.com",
		dirBF: "/assets, /images, /scripts",
		port: "80, 443",
		services: "HTTP/Nginx, HTTPS/Nginx",
		techStack: "Next.js, Tailwind CSS",
	},
	{
		subEnum: "internal.example.com",
		dirBF: "/internal, /config, /secrets",
		port: "21, 22",
		services: "FTP/vsftpd 3.0.3, SSH/OpenSSH 7.9",
		techStack: "Python, Django, SQLite",
	},
];

export const httpData: HttpResult[] = [
	{
		httpHeader: `HTTP/1.1 200 OK
					Server: nginx/1.18.0
					Date: Tue, 04 Jun 2025 10:30:00 GMT
					Content-Type: text/html; charset=UTF-8
					Connection: keep-alive
					X-Powered-By: PHP/7.4.3`,

		sslCert: `Common Name: www.example.com
Issuer: R3, Let's Encrypt
Valid From: 2025-05-01
Valid To: 2025-07-30
Public Key: RSA (2048 Bits)
Fingerprint: SHA256:AB:CD:EF:...`,

		parsing: `HTML title: Example Domain
Found 5 scripts, 3 external links
Technology: Apache, WordPress, PHP`,

		wafDetect: `Possible WAF detected: Cloudflare
Method: Detected via response headers (cf-ray, server: cloudflare)`,
	},
	{
		httpHeader: `HTTP/2 301 Moved Permanently
Server: cloudflare
Location: https://example.org/
Content-Length: 0
Connection: keep-alive`,

		sslCert: `Common Name: example.org
Issuer: DigiCert Inc
Valid From: 2025-02-01
Valid To: 2026-01-30
Fingerprint: SHA256:12:34:56:...`,

		parsing: `HTML title: Redirecting...
Technology: Nginx, React`,

		wafDetect: `No WAF detected
Method: Signature-based scan returned no match`,
	},
];

export const dnsData: DnsResult[] = [
	{
		dnsZone: `example.com.	3600	IN	SOA	ns1.example.com. hostmaster.example.com. 2025060401 7200 3600 1209600 3600
example.com.	3600	IN	NS	ns1.example.com.
example.com.	3600	IN	NS	ns2.example.com.`,

		reverseIP: `93.184.216.34.in-addr.arpa. domain name pointer example.com.`,

		dnsRecord: `A     example.com.      93.184.216.34
MX    example.com.      mail.example.com. (priority 10)
TXT   example.com.      "v=spf1 include:_spf.example.com ~all"
AAAA  example.com.      2606:2800:220:1:248:1893:25c8:1946`,
	},
	{
		dnsZone: `testsite.org.	3600	IN	SOA	ns1.testsite.org. admin.testsite.org. 2025060401 7200 3600 1209600 3600
testsite.org.	3600	IN	NS	ns1.testsite.org.
testsite.org.	3600	IN	NS	ns2.testsite.org.`,

		reverseIP: `203.0.113.45.in-addr.arpa. domain name pointer testsite.org.`,

		dnsRecord: `A     testsite.org.     203.0.113.45
CNAME www.testsite.org.  testsite.org.
TXT   testsite.org.      "v=spf1 ip4:203.0.113.0/24 ~all"`,
	},
];
