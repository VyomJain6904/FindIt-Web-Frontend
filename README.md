# FindIt

**FindIt** is a comprehensive domain reconnaissance tool now extended as a full-fledged **Web Application**. It gathers extensive information about a target domain and presents it through an intuitive interface.

---

![Structure](/Public/diagram-FindIt.png)

---

## 🌟 Features

### 🧠 Core Functionalities

-   **Domain Resolution**  
    Resolves the target domain to its IP address(es).

-   **Subdomain Enumeration**  
    Discovers subdomains using common wordlist brute-forcing.

-   **Port Scanning (Optional)**  
    Uses `nmap` to identify open TCP/UDP ports.

-   **Service & Version Detection**  
    Identifies services running on open ports along with version details (requires port scan).

-   **OS Detection**  
    Performs operating system fingerprinting using `nmap` (requires port scan).

-   **Web Technology Detection**  
    Detects CMS, frameworks, libraries, and analytics tools used by the target and its subdomains.

-   **Directory Brute-Forcing**  
    Searches for common web directories using a wordlist (301 redirects excluded by default).

-   **Cloud Storage Check**  
    Checks for publicly accessible AWS S3 and Google Cloud buckets based on naming conventions.

-   **TFTP Server Check**  
    Identifies potential TFTP servers using UDP scan results (requires port scan with UDP enabled).

-   **Concurrent Scanning**  
    Multi-threaded scanning for faster and efficient reconnaissance.

-   **Rich Console Output**  
    Utilizes the `rich` Python library for beautifully formatted console output.

-   **File Reporting**  
    Saves results in `.txt` or `.json` formats for later reference.

---

## 🧪 Advanced Features

### 🧬 DNS Enumeration Enhancement

-   Zone transfers (`AXFR`)
-   Reverse DNS lookups
-   DNS record types: `MX`, `TXT`, `SOA`, `CNAME`, etc.
-   Subdomain discovery using Certificate Transparency logs

### 🛡️ Web Application Security Checks

-   Security header analysis (e.g., CSP, HSTS, X-Frame-Options)
-   SSL/TLS certificate inspection
-   `robots.txt` and `sitemap.xml` parsing
-   WAF detection (e.g., CloudFlare, AWS WAF)
-   Recon data stored in a database for historical tracking

---

## 💻 Web Application Interface

-   **Frontend**: Built with **Next.js** and **Tailwind CSS** for a fast and modern user experience.
-   **Backend**: Powered by **Python (Django)** to handle all scanning logic and data storage.
-   **Database**: Uses **NeonDB** for persistent data management.
-   **CLI Integration**: Includes a CLI utility for those who prefer terminal-based interactions.

---

## 📦 Installation

1. **Clone the repository**
    ```bash
    git clone https://github.com/VyomJain6904/FindIt-Web-Application.git
    cd FindIt-Web-Application
    ```
