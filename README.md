# Tailwindcss-pluins
+ Provite useful plugins for tailwind-css
## plugins list
+ selectorWeight
  - p&: weight add 0001
  - &: weight add 0010
> use:
```javascript
   <p className="&:p&:&:text-red ">ss</p>
```
> compiler
```css
/* &:p&:&:text-red */
.\&\:p\&\:\&\:text-red[class*=\&\:text-red]:not(script)[class*=\&\:text-red] {
    color: var(--red);
}
``

