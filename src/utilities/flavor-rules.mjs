export function filterFlavors(flavors, category) {
  return category === 'Todos'
    ? flavors
    : flavors.filter((flavor) => flavor.categories.includes(category));
}
export function recommendFlavor(flavors, mood) {
  return flavors.find((flavor) => flavor.mood === mood) ?? null;
}
