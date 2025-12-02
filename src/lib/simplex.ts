// Simplex Method Implementation for 2-variable Linear Programming
// Maximization problem with <= constraints

export interface LPConstraint {
  coeffX1: number;
  coeffX2: number;
  rhs: number;
  name: string;
}

export interface LPProblem {
  objectiveX1: number;
  objectiveX2: number;
  constraints: LPConstraint[];
}

export interface LPSolution {
  x1: number;
  x2: number;
  optimalValue: number;
  status: 'optimal' | 'unbounded' | 'infeasible' | 'error';
  constraintStatus: {
    name: string;
    leftValue: number;
    rightValue: number;
    isBinding: boolean;
    slack: number;
  }[];
}

// Solve LP using corner point method (suitable for 2 variables)
export function solveLPCornerPoint(problem: LPProblem): LPSolution {
  const { objectiveX1, objectiveX2, constraints } = problem;

  // Generate all corner points of feasible region
  const points: { x1: number; x2: number }[] = [];

  // Add origin
  points.push({ x1: 0, x2: 0 });

  // Add intersections with axes
  for (const c of constraints) {
    if (c.coeffX1 > 0) {
      const x1 = c.rhs / c.coeffX1;
      if (x1 >= 0 && isPointFeasible({ x1, x2: 0 }, constraints)) {
        points.push({ x1, x2: 0 });
      }
    }
    if (c.coeffX2 > 0) {
      const x2 = c.rhs / c.coeffX2;
      if (x2 >= 0 && isPointFeasible({ x1: 0, x2 }, constraints)) {
        points.push({ x1: 0, x2 });
      }
    }
  }

  // Add intersections between constraint lines
  for (let i = 0; i < constraints.length; i++) {
    for (let j = i + 1; j < constraints.length; j++) {
      const intersection = findIntersection(constraints[i], constraints[j]);
      if (intersection && intersection.x1 >= 0 && intersection.x2 >= 0) {
        if (isPointFeasible(intersection, constraints)) {
          points.push(intersection);
        }
      }
    }
  }

  // Find optimal point
  let bestPoint = { x1: 0, x2: 0 };
  let bestValue = -Infinity;
  let foundFeasible = false;

  for (const point of points) {
    const value = objectiveX1 * point.x1 + objectiveX2 * point.x2;
    if (value > bestValue) {
      bestValue = value;
      bestPoint = point;
      foundFeasible = true;
    }
  }

  if (!foundFeasible) {
    return {
      x1: 0,
      x2: 0,
      optimalValue: 0,
      status: 'infeasible',
      constraintStatus: []
    };
  }

  // Calculate constraint status
  const constraintStatus = constraints.map(c => {
    const leftValue = c.coeffX1 * bestPoint.x1 + c.coeffX2 * bestPoint.x2;
    const slack = c.rhs - leftValue;
    return {
      name: c.name,
      leftValue: Math.round(leftValue * 100) / 100,
      rightValue: c.rhs,
      isBinding: Math.abs(slack) < 0.01,
      slack: Math.round(slack * 100) / 100
    };
  });

  return {
    x1: Math.round(bestPoint.x1 * 100) / 100,
    x2: Math.round(bestPoint.x2 * 100) / 100,
    optimalValue: Math.round(bestValue * 100) / 100,
    status: 'optimal',
    constraintStatus
  };
}

function findIntersection(c1: LPConstraint, c2: LPConstraint): { x1: number; x2: number } | null {
  // Solve system: a1*x1 + b1*x2 = r1, a2*x1 + b2*x2 = r2
  const det = c1.coeffX1 * c2.coeffX2 - c2.coeffX1 * c1.coeffX2;
  
  if (Math.abs(det) < 1e-10) {
    return null; // Parallel lines
  }

  const x1 = (c1.rhs * c2.coeffX2 - c2.rhs * c1.coeffX2) / det;
  const x2 = (c1.coeffX1 * c2.rhs - c2.coeffX1 * c1.rhs) / det;

  return { x1, x2 };
}

function isPointFeasible(point: { x1: number; x2: number }, constraints: LPConstraint[]): boolean {
  const epsilon = 1e-6;
  for (const c of constraints) {
    const value = c.coeffX1 * point.x1 + c.coeffX2 * point.x2;
    if (value > c.rhs + epsilon) {
      return false;
    }
  }
  return true;
}

// Generate feasible region vertices for visualization
export function getFeasibleRegionVertices(constraints: LPConstraint[], maxX1: number, maxX2: number): { x1: number; x2: number }[] {
  const points: { x1: number; x2: number }[] = [];
  
  // Add origin
  if (isPointFeasible({ x1: 0, x2: 0 }, constraints)) {
    points.push({ x1: 0, x2: 0 });
  }

  // Add axis intersections
  for (const c of constraints) {
    if (c.coeffX1 > 0) {
      const x1 = c.rhs / c.coeffX1;
      if (x1 >= 0 && x1 <= maxX1 && isPointFeasible({ x1, x2: 0 }, constraints)) {
        points.push({ x1, x2: 0 });
      }
    }
    if (c.coeffX2 > 0) {
      const x2 = c.rhs / c.coeffX2;
      if (x2 >= 0 && x2 <= maxX2 && isPointFeasible({ x1: 0, x2 }, constraints)) {
        points.push({ x1: 0, x2 });
      }
    }
  }

  // Add constraint intersections
  for (let i = 0; i < constraints.length; i++) {
    for (let j = i + 1; j < constraints.length; j++) {
      const intersection = findIntersection(constraints[i], constraints[j]);
      if (intersection && 
          intersection.x1 >= 0 && intersection.x1 <= maxX1 &&
          intersection.x2 >= 0 && intersection.x2 <= maxX2 &&
          isPointFeasible(intersection, constraints)) {
        points.push(intersection);
      }
    }
  }

  // Sort points by angle from centroid for proper polygon rendering
  if (points.length < 3) return points;

  const centroid = {
    x1: points.reduce((sum, p) => sum + p.x1, 0) / points.length,
    x2: points.reduce((sum, p) => sum + p.x2, 0) / points.length
  };

  return points.sort((a, b) => {
    const angleA = Math.atan2(a.x2 - centroid.x2, a.x1 - centroid.x1);
    const angleB = Math.atan2(b.x2 - centroid.x2, b.x1 - centroid.x1);
    return angleA - angleB;
  });
}
