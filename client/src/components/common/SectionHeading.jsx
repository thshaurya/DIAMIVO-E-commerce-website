import React from 'react';

const SectionHeading = ({
  eyebrow = '',
  title = '',
  subtitle = '',
  align = 'center',
  light = false
}) => {
  return (
    <div
      style={{
        textAlign: align,
        marginBottom: '3rem',
        maxWidth: align === 'center' ? '700px' : '100%',
        marginLeft: align === 'center' ? 'auto' : 0,
        marginRight: align === 'center' ? 'auto' : 0
      }}
    >
      {eyebrow && (
        <span
          style={{
            display: 'inline-block',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.2em',
            color: 'var(--color-gold)',
            marginBottom: '0.75rem'
          }}
        >
          {eyebrow}
        </span>
      )}

      {title && (
        <h2
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2rem, 3.5vw, 2.75rem)',
            fontWeight: 500,
            color: light ? '#ffffff' : 'var(--color-primary-dark)',
            lineHeight: 1.2,
            marginBottom: subtitle ? '1rem' : 0
          }}
        >
          {title}
        </h2>
      )}

      {subtitle && (
        <p
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '1rem',
            color: light ? 'var(--color-silver)' : 'var(--color-text-muted)',
            lineHeight: 1.6
          }}
        >
          {subtitle}
        </p>
      )}

      <div
        style={{
          width: '60px',
          height: '2px',
          backgroundColor: 'var(--color-gold)',
          margin: align === 'center' ? '1.5rem auto 0 auto' : '1.5rem 0 0 0',
          opacity: 0.8
        }}
      />
    </div>
  );
};

export default SectionHeading;
