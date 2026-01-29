"use client";

import { useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  Filter,
  Search,
  Globe,
  Server,
  Shield,
  FileCode,
  AlertTriangle,
  CheckCircle,
  ChevronDown
} from 'lucide-react';

// Mock data - replace with actual API call
const mockResults = {
  subdomains: [
    { value: 'api.example.com', ip: '192.168.1.1', status: 'active' },
    { value: 'mail.example.com', ip: '192.168.1.2', status: 'active' },
    { value: 'dev.example.com', ip: '192.168.1.3', status: 'inactive' },
    { value: 'staging.example.com', ip: '192.168.1.4', status: 'active' },
    { value: 'admin.example.com', ip: '192.168.1.5', status: 'active' },
  ],
  ports: [
    { port: 80, service: 'HTTP', state: 'open' },
    { port: 443, service: 'HTTPS', state: 'open' },
    { port: 22, service: 'SSH', state: 'open' },
    { port: 3306, service: 'MySQL', state: 'filtered' },
  ],
  technologies: [
    { name: 'nginx', version: '1.21.0', category: 'Web Server' },
    { name: 'React', version: '18.2.0', category: 'Frontend' },
    { name: 'Node.js', version: '18.x', category: 'Runtime' },
  ],
  dns: [
    { type: 'A', value: '192.168.1.1' },
    { type: 'MX', value: 'mail.example.com' },
    { type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all' },
    { type: 'NS', value: 'ns1.example.com' },
  ],
};

type ResultTab = 'subdomains' | 'ports' | 'technologies' | 'dns';

interface ResultsPageProps {
  scanId: string;
}

export default function ResultsPageClient({ scanId }: ResultsPageProps) {
  const [activeTab, setActiveTab] = useState<ResultTab>('subdomains');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'subdomains' as const, label: 'Subdomains', icon: Globe, count: mockResults.subdomains.length },
    { id: 'ports' as const, label: 'Ports', icon: Server, count: mockResults.ports.length },
    { id: 'technologies' as const, label: 'Technologies', icon: FileCode, count: mockResults.technologies.length },
    { id: 'dns' as const, label: 'DNS Records', icon: Shield, count: mockResults.dns.length },
  ];

  return (
    <div className="min-h-screen bg-[#282A36] p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-lg bg-[#44475A] hover:bg-[#6272A4]/50 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-[#F8F8F2]" />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-[#F8F8F2]">Scan Results</h1>
            <p className="text-sm text-[#6272A4]">Scan ID: {scanId}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#44475A] text-[#F8F8F2] rounded-lg hover:bg-[#6272A4]/50 transition-colors">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filter</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#BD93F9] text-[#282A36] rounded-lg hover:bg-[#FF79C6] transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm">Export</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <motion.div
              key={tab.id}
              whileHover={{ scale: 1.02 }}
              className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#BD93F9]/20 border-[#BD93F9]'
                  : 'bg-[#44475A] border-[#6272A4]/30 hover:border-[#6272A4]'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${activeTab === tab.id ? 'bg-[#BD93F9]/30' : 'bg-[#6272A4]/20'}`}>
                  <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-[#BD93F9]' : 'text-[#8BE9FD]'}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-[#F8F8F2]">{tab.count}</p>
                  <p className="text-sm text-[#6272A4]">{tab.label}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6272A4]" />
        <input
          type="text"
          placeholder={`Search ${activeTab}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 bg-[#44475A] border border-[#6272A4]/30 rounded-xl text-[#F8F8F2] placeholder-[#6272A4] focus:outline-none focus:border-[#BD93F9]"
        />
      </div>

      {/* Results Table */}
      <div className="bg-[#44475A] rounded-xl border border-[#6272A4]/30 overflow-hidden">
        {activeTab === 'subdomains' && (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#6272A4]/30">
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6272A4]">Subdomain</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6272A4]">IP Address</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6272A4]">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockResults.subdomains.map((sub, idx) => (
                <motion.tr
                  key={sub.value}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-[#6272A4]/20 hover:bg-[#6272A4]/10"
                >
                  <td className="px-6 py-4 text-[#50FA7B] font-mono text-sm">{sub.value}</td>
                  <td className="px-6 py-4 text-[#F8F8F2] font-mono text-sm">{sub.ip}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs ${
                      sub.status === 'active'
                        ? 'bg-[#50FA7B]/20 text-[#50FA7B]'
                        : 'bg-[#6272A4]/20 text-[#6272A4]'
                    }`}>
                      {sub.status === 'active' ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                      {sub.status}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'ports' && (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#6272A4]/30">
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6272A4]">Port</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6272A4]">Service</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6272A4]">State</th>
              </tr>
            </thead>
            <tbody>
              {mockResults.ports.map((port, idx) => (
                <motion.tr
                  key={port.port}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-[#6272A4]/20 hover:bg-[#6272A4]/10"
                >
                  <td className="px-6 py-4 text-[#FFB86C] font-mono text-sm">{port.port}</td>
                  <td className="px-6 py-4 text-[#F8F8F2] text-sm">{port.service}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      port.state === 'open'
                        ? 'bg-[#50FA7B]/20 text-[#50FA7B]'
                        : 'bg-[#F1FA8C]/20 text-[#F1FA8C]'
                    }`}>
                      {port.state}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'technologies' && (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#6272A4]/30">
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6272A4]">Technology</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6272A4]">Version</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6272A4]">Category</th>
              </tr>
            </thead>
            <tbody>
              {mockResults.technologies.map((tech, idx) => (
                <motion.tr
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-[#6272A4]/20 hover:bg-[#6272A4]/10"
                >
                  <td className="px-6 py-4 text-[#FF79C6] text-sm">{tech.name}</td>
                  <td className="px-6 py-4 text-[#F8F8F2] font-mono text-sm">{tech.version}</td>
                  <td className="px-6 py-4 text-[#6272A4] text-sm">{tech.category}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}

        {activeTab === 'dns' && (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#6272A4]/30">
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6272A4]">Type</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-[#6272A4]">Value</th>
              </tr>
            </thead>
            <tbody>
              {mockResults.dns.map((record, idx) => (
                <motion.tr
                  key={`${record.type}-${idx}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="border-b border-[#6272A4]/20 hover:bg-[#6272A4]/10"
                >
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-[#8BE9FD]/20 text-[#8BE9FD] rounded text-xs font-mono">
                      {record.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[#F8F8F2] font-mono text-sm">{record.value}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
