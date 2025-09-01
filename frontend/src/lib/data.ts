export type DomainResult = {
	domainName: string;
	ipAddress: string;
	isp: string;
};

export type DnsResult = {
	dnsZone: string;
	reverseIP: string;
	dnsRecord: string;
};

export type HttpResult = {
	httpHeader: string;
	sslCert: string;
	parsing: string;
	wafDetect: string;
};

export type ScanResult = {
	subEnum: string;
	dirBF: string;
	port: string;
	services: string;
	techStack: string;
};

export type CloudResult = {
	cloudScan: string;
	tftpScan: string;
};

export type MapResult = {
	ipAddress: string;
	cordinates: string;
};
