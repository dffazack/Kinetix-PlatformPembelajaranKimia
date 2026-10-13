'use client';

import React from 'react';
import Link from 'next/link';
import { ContentBlock } from '@/lib/types';
import FillBlankBlock from './FillBlankBlock';
import { FlaskConical, AlertCircle, Info, Lightbulb, Binary, ExternalLink, Play } from 'lucide-react';
import { getYouTubeEmbedUrl } from '@/lib/utils';

interface ContentBlockRendererProps {
  block: ContentBlock;
  lessonId?: string;
}

export default function ContentBlockRenderer({ block, lessonId }: ContentBlockRendererProps) {
  switch (block.type) {
    case 'heading':
      return (
        <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-wide text-charcoal-900 border-l-4 border-teal pl-3 py-1 font-sans">
          {block.content}
        </h2>
      );

    case 'text':
      return (
        <div className="text-charcoal-800 leading-relaxed space-y-3 font-sans text-sm sm:text-base">
          {block.content.split('\n\n').map((paragraph, i) => (
            <p key={i} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>
      );

    case 'callout': {
      const variant = block.metadata?.variant || 'info';
      let borderColor = 'border-teal';
      let bgColor = 'bg-teal/10';
      let Icon = Info;

      if (variant === 'warning') {
        borderColor = 'border-pink';
        bgColor = 'bg-pink/15';
        Icon = AlertCircle;
      } else if (variant === 'tip') {
        borderColor = 'border-teal-dark';
        bgColor = 'bg-cream-card';
        Icon = Lightbulb;
      } else if (variant === 'formula') {
        borderColor = 'border-charcoal-900';
        bgColor = 'bg-cream-card';
        Icon = Binary;
      }

      return (
        <div className={`border-2 ${borderColor} ${bgColor} p-4 sm:p-5 kinetix-shadow-sm space-y-2`}>
          <div className="flex items-center gap-2 font-mono font-bold text-xs uppercase text-teal-deep">
            <Icon className="w-4 h-4 text-teal" />
            <span>Kaidah Penting Kinetika Kimia</span>
          </div>
          <div className="text-sm font-medium text-charcoal-900 leading-relaxed">
            {block.content}
          </div>
        </div>
      );
    }

    case 'equation':
      return (
        <div className="bg-cream-card border-2 border-charcoal-900 p-4 font-mono text-center kinetix-shadow-sm space-y-1">
          <div className="text-base sm:text-lg font-bold text-teal-deep tracking-wider">
            {block.content}
          </div>
          {block.metadata?.caption && (
            <div className="text-[11px] text-charcoal-500 font-sans italic">
              {block.metadata.caption}
            </div>
          )}
        </div>
      );

    case 'image':
      return (
        <div className="bg-cream-card border-2 border-teal-dark p-3 space-y-2">
          <div className="relative w-full aspect-video bg-cream-dark flex items-center justify-center border border-charcoal-400">
            {/* If content is an actual image URL or SVG graphic */}
            <span className="font-mono text-xs text-charcoal-600">
              [Ilustrasi Diagram Kinetika Kimia]
            </span>
          </div>
          {block.metadata?.caption && (
            <p className="text-xs font-mono text-center text-charcoal-600">
              {block.metadata.caption}
            </p>
          )}
        </div>
      );

    case 'video': {
      const embedUrl = getYouTubeEmbedUrl(block.content);
      return (
        <div className="bg-cream-card border-2 border-teal-dark p-4 space-y-3 kinetix-shadow-sm">
          <div className="flex items-center justify-between border-b border-charcoal-300 pb-2">
            <span className="text-xs font-mono font-bold uppercase text-teal-deep flex items-center gap-1.5">
              <Play className="w-3.5 h-3.5 text-pink" />
              {block.metadata?.caption || 'Video Eksplorasi Pembelajaran'}
            </span>
          </div>
          {embedUrl ? (
            <div className="aspect-video w-full border-2 border-charcoal-900 bg-black">
              <iframe
                src={embedUrl}
                title={block.metadata?.caption || 'Video Pembelajaran Kinetix'}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <p className="text-xs text-charcoal-700">Tonton demonstrasi visual kinetika reaksi berikut:</p>
          )}
          <div className="flex justify-end">
            <a
              href={block.content}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono font-bold text-teal-dark hover:text-pink inline-flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5 text-teal" />
              Tonton di YouTube
            </a>
          </div>
        </div>
      );
    }

    case 'fill_blank':
      return <FillBlankBlock block={block} />;

    case 'experiment_cta': {
      const expType = block.metadata?.experimentType || 'FACTORS_REACTION';
      const buttonLabel = block.metadata?.buttonLabel || 'Buka Simulasi Eksperimen Terkait';

      return (
        <div className="bg-teal text-white border-2 border-charcoal-900 p-6 kinetix-shadow-dark space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-pink text-charcoal-900 border border-charcoal-900">
              <FlaskConical className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-pink font-bold">
                Eksperimen Interaktif
              </span>
              <h4 className="text-lg font-bold uppercase tracking-wide">
                Uji Teori Ini di Laboratorium Virtual!
              </h4>
            </div>
          </div>

          <p className="text-sm text-cream/90 leading-relaxed font-sans">
            {block.content}
          </p>

          <div>
            <Link
              href={`/experiments?type=${expType}`}
              className="kinetix-btn-pink inline-flex items-center gap-2 text-xs py-2.5 px-4"
            >
              <FlaskConical className="w-4 h-4" />
              {buttonLabel}
            </Link>
          </div>
        </div>
      );
    }

    default:
      return null;
  }
}
