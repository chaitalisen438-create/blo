import React from "react";
import { X, Ruler } from "lucide-react";

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SizeGuideModal({ isOpen, onClose }: SizeGuideModalProps) {
  if (!isOpen) return null;

  const sizeChart = [
    { size: "XS", bust: "32\"", waist: "26\"", shoulders: "13.5\"", frontNeck: "7.0\"", backNeck: "8.5\"" },
    { size: "S", bust: "34\"", waist: "28\"", shoulders: "14.0\"", frontNeck: "7.25\"", backNeck: "9.0\"" },
    { size: "M", bust: "36\"", waist: "30\"", shoulders: "14.5\"", frontNeck: "7.5\"", backNeck: "9.5\"" },
    { size: "L", bust: "38\"", waist: "32\"", shoulders: "15.0\"", frontNeck: "7.75\"", backNeck: "10.0\"" },
    { size: "XL", bust: "40\"", waist: "34\"", shoulders: "15.5\"", frontNeck: "8.0\"", backNeck: "10.5\"" },
    { size: "XXL", bust: "42\"", waist: "36\"", shoulders: "16.0\"", frontNeck: "8.25\"", backNeck: "11.0\"" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-[#FCFBF8] border border-[#62141C]/20 max-w-2xl w-full rounded-lg shadow-2xl overflow-hidden relative max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-[#62141C]/10 bg-[#F7F3E8] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Ruler className="w-5 h-5 text-[#62141C]" />
            <h3 className="text-lg font-serif font-bold text-[#62141C] uppercase tracking-wide">
              Sindaram Blouse Size Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#2C211E]/60 hover:text-[#62141C] hover:bg-[#62141C]/5 transition-colors cursor-pointer"
            title="Close Size Guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="text-xs text-[#2C211E]/70 leading-relaxed">
            Please use this measurement chart to select your perfect blouse size. We keep a <span className="font-semibold text-[#62141C]">2-inch margin</span> inside all our designer blouses to allow easy alterations if needed.
          </div>

          <div className="overflow-x-auto border border-[#62141C]/10 rounded">
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead>
                <tr className="bg-[#62141C] text-[#F7F3E8] uppercase tracking-wider text-[11px] font-sans">
                  <th className="p-3">Size</th>
                  <th className="p-3">Bust Size (Inches)</th>
                  <th className="p-3">Waist (Inches)</th>
                  <th className="p-3">Shoulders</th>
                  <th className="p-3">Front Neck Drop</th>
                  <th className="p-3">Back Neck Drop</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#62141C]/10 font-mono">
                {sizeChart.map((row, idx) => (
                  <tr 
                    key={idx} 
                    className={`hover:bg-[#62141C]/5 transition-colors ${
                      idx % 2 === 0 ? "bg-transparent" : "bg-[#F7F3E8]/30"
                    }`}
                  >
                    <td className="p-3 font-sans font-bold text-[#62141C]">{row.size}</td>
                    <td className="p-3 text-[#2C211E]">{row.bust}</td>
                    <td className="p-3 text-[#2C211E]">{row.waist}</td>
                    <td className="p-3 text-[#2C211E]">{row.shoulders}</td>
                    <td className="p-3 text-[#2C211E]">{row.frontNeck}</td>
                    <td className="p-3 text-[#2C211E]">{row.backNeck}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tips for measuring */}
          <div className="bg-[#F7F3E8]/70 p-4 rounded border border-[#C5A059]/25 text-xs text-[#2C211E]/90 space-y-2">
            <h4 className="font-serif font-bold text-[#62141C] text-[13px] uppercase">
              How to Measure Yourself:
            </h4>
            <ul className="list-disc pl-4 space-y-1">
              <li>
                <span className="font-semibold">Bust:</span> Wrap a soft tape around the fullest part of your chest while wearing a well-fitting bra.
              </li>
              <li>
                <span className="font-semibold">Waist:</span> Measure your midriff right where the bottom hem of the blouse will rest (about 1–2 inches above the navel).
              </li>
              <li>
                <span className="font-semibold">Shoulders:</span> Measure from one shoulder tip to the other across your back.
              </li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#62141C]/10 bg-[#F7F3E8] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#62141C] text-[#F7F3E8] hover:bg-[#3A0A0E] text-xs font-semibold uppercase tracking-wider rounded transition-colors cursor-pointer"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
}
