# Parallax Effect Guide

This document explains the parallax scrolling effects implemented in the Hero section.

## Overview

The Hero section now features smooth parallax scrolling effects that create depth and visual interest as users scroll down the page.

## Parallax Effects Implemented

### 1. **Text Content Parallax**
- **Effect**: Text moves slower than the scroll speed and fades out
- **Transform**: Moves down 50% as user scrolls
- **Opacity**: Fades from 100% → 80% → 0%
- **Purpose**: Creates depth and smooth transition to next section

### 2. **Image Parallax**
- **Effect**: Image moves slower and scales up slightly
- **Transform**: Moves down 30% as user scrolls
- **Scale**: Grows from 100% → 110%
- **Opacity**: Fades from 100% → 90% → 30%
- **Purpose**: Creates 3D depth effect

### 3. **Background Gradient Blobs**
- **Top-Right Blob**: 
  - Moves down 100% (faster than content)
  - Fades out completely
  - Blue gradient (blue-400/10)
  
- **Bottom-Left Blob**:
  - Moves up 80% (opposite direction)
  - Fades out completely
  - Cyan gradient (cyan-400/10)
  
- **Purpose**: Dynamic background that enhances depth

### 4. **Floating Decorative Elements**
- **Top-Right Element**:
  - Scales: 1 → 1.2 → 1
  - Rotates: 0° → 180° → 360°
  - Duration: 8 seconds
  - Blue glow effect
  
- **Bottom-Left Element**:
  - Scales: 1 → 1.3 → 1
  - Rotates: 360° → 180° → 0° (reverse)
  - Duration: 6 seconds
  - Cyan glow effect
  
- **Purpose**: Adds subtle animation and visual interest

### 5. **Image Float Animation**
- **Effect**: Gentle up-and-down floating motion
- **Range**: 0px → -15px → 0px
- **Duration**: 3 seconds
- **Loop**: Infinite
- **Purpose**: Creates living, breathing feel

## Technical Implementation

### Framer Motion Hooks Used

```javascript
// Scroll progress tracking
const { scrollYProgress } = useScroll({
  target: sectionRef,
  offset: ["start start", "end start"]
});

// Transform values
const textY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
const textOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
const imageOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.9, 0.3]);
```

### CSS Enhancements

```css
/* Hero section styling */
#home {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
}

/* Subtle gradient background */
#home::before {
  background-image: 
    radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.05) 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, rgba(14, 165, 233, 0.05) 0%, transparent 50%);
}
```

## Performance Optimizations

### 1. **Will-Change Property**
```css
.parallax-optimized {
  will-change: transform, opacity;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### 2. **GPU Acceleration**
- Uses `transform` instead of `top/left` for better performance
- `translateZ(0)` forces GPU acceleration
- `backface-visibility: hidden` prevents flickering

### 3. **Reduced Motion Support**
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Parallax Layers

The Hero section uses multiple depth layers:

1. **Background Layer** (Slowest)
   - Gradient blobs
   - Move fastest relative to scroll
   
2. **Content Layer** (Medium)
   - Text content
   - Moderate parallax speed
   
3. **Image Layer** (Slower)
   - Hero image
   - Slower parallax speed
   - Creates depth
   
4. **Decorative Layer** (Independent)
   - Floating elements
   - Animated independently
   - Adds visual interest

## Scroll Behavior

### Scroll Range: 0% → 100%

**At 0% (Top of page):**
- Text: Fully visible, normal position
- Image: Fully visible, normal size
- Background blobs: Visible at 50% opacity

**At 50% (Mid-scroll):**
- Text: 80% opacity, moved down 25%
- Image: 90% opacity, moved down 15%, scaled to 105%
- Background blobs: Fading out

**At 100% (Fully scrolled):**
- Text: Invisible, moved down 50%
- Image: 30% opacity, moved down 30%, scaled to 110%
- Background blobs: Completely faded

## Browser Compatibility

### Supported Browsers
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Fallback Behavior
- Older browsers: Standard scroll without parallax
- Reduced motion preference: Minimal animations
- Mobile devices: Optimized for touch scrolling

## Customization

### Adjusting Parallax Speed

**Slower parallax:**
```javascript
const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]); // Was 50%
```

**Faster parallax:**
```javascript
const textY = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]); // Was 50%
```

### Adjusting Fade Timing

**Fade out earlier:**
```javascript
const textOpacity = useTransform(scrollYProgress, [0, 0.3, 0.6], [1, 0.8, 0]); // Was [0, 0.5, 1]
```

**Fade out later:**
```javascript
const textOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 0.8, 0]); // Was [0, 0.5, 1]
```

### Adding More Layers

```javascript
// Add a new parallax layer
const newLayerY = useTransform(scrollYProgress, [0, 1], ["0%", "60%"]);

// Apply to element
<motion.div style={{ y: newLayerY }}>
  {/* Your content */}
</motion.div>
```

## Best Practices

### Do's ✅
- Keep parallax subtle for better UX
- Test on different screen sizes
- Ensure content remains readable
- Use GPU-accelerated properties
- Provide fallbacks for older browsers

### Don'ts ❌
- Don't overuse parallax effects
- Avoid parallax on critical content
- Don't use on mobile if performance suffers
- Avoid conflicting with scroll-based navigation
- Don't ignore accessibility preferences

## Accessibility

### Considerations
- Respects `prefers-reduced-motion` setting
- Maintains content readability during scroll
- Doesn't interfere with keyboard navigation
- Screen readers can access all content
- Focus indicators remain visible

### Testing
```bash
# Test with reduced motion
# In browser DevTools:
# 1. Open DevTools (F12)
# 2. Press Cmd/Ctrl + Shift + P
# 3. Type "Emulate CSS prefers-reduced-motion"
# 4. Select "prefers-reduced-motion: reduce"
```

## Troubleshooting

### Issue: Parallax feels janky
**Solution**: Check if `will-change` is applied, reduce number of animated elements

### Issue: Content disappears too quickly
**Solution**: Adjust opacity transform ranges to fade out later

### Issue: Mobile performance issues
**Solution**: Consider disabling parallax on mobile devices:
```javascript
const isMobile = window.innerWidth < 768;
const textY = isMobile ? 0 : useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
```

### Issue: Parallax not working
**Solution**: Ensure Framer Motion is installed and section has proper ref:
```bash
npm install framer-motion
```

## Future Enhancements

Potential additions:
- Mouse parallax (follows cursor movement)
- Scroll-triggered animations for other sections
- 3D tilt effects on hover
- Particle effects in background
- Parallax on other hero-style sections
