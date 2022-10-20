import React, { ReactNode, Suspense, useContext, useEffect, useMemo } from "react";
import { AngularWrapperProps } from "./lazy-angular-wrapper";
import SuspendingLazyAngularWrapperWithPromises from "./suspending-lazy-angular-wrapper-with-promises";
import { LazyAngularModuleContext } from "../lib/lazy-angular-module-context";

export default function LazyAngularWrapperWithLoaders({
  componentLoader,
  fallback,
  ...props
}: {
  componentLoader: () => Promise<any>;
  fallback: ReactNode,
} & AngularWrapperProps) {
  const moduleRefLoader = useContext(LazyAngularModuleContext);

  const componentPromise = useMemo(() => componentLoader(), [componentLoader]);

  const moduleRefPromise = useMemo(() => moduleRefLoader(), [moduleRefLoader]);

  return (
    <Suspense fallback={fallback}>
      <SuspendingLazyAngularWrapperWithPromises
        componentPromise={componentPromise}
        moduleRefPromise={moduleRefPromise}
        {...props}
      />
    </Suspense>
  );
}