import { useCallback, useMemo, useState } from "react";
import Tree from "react-d3-tree";
import type { TreeNodeEventCallback } from "react-d3-tree";
import { buildRepoTree } from "./utils/buildRepoTree";
import type {
  RepoTreeNodeAttributes,
  RepoTreeDiagramProps,
  TreeNode,
} from "@/types/treeDiagram";
import { getDeviconForLanguage } from "@/utils/getDevIcon";

/**
 * Horizontal tree:
 *
 *   [ user ]
 *      ├─ [ language ]
 *      │      ├─ [ repo ]
 *      │      └─ [ repo ]
 *      └─ [ language ]
 */
export function RepoTreeDiagram({
  user,
  repos,
  onSelectRepo,
}: RepoTreeDiagramProps) {
  const [translate, setTranslate] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  // Measure container size to center the tree vertically
  const containerRef = useCallback((elem: HTMLDivElement | null) => {
    if (!elem) return;
    const { width, height } = elem.getBoundingClientRect();
    // For horizontal orientation:
    // - x: small offset from left
    // - y: vertical center
    setTranslate({ x: 80, y: height / 2 });
  }, []);

  const treeData: TreeNode = useMemo(
    () => buildRepoTree(user, repos),
    [user, repos]
  );

  // Click handler: if it's a repo node, look up the repo by id and notify parent
  const handleNodeClick = useCallback<TreeNodeEventCallback>(
    (nodeDatum, _event) => {
      const attrs = nodeDatum?.data?.attributes as
        | RepoTreeNodeAttributes
        | undefined;

      if (!attrs || attrs.type !== "repo" || !attrs.repoId) {
        onSelectRepo?.(null);
        return;
      }

      const repo = repos.find((r) => r.id === attrs.repoId) ?? null;

      onSelectRepo?.(repo);
    },
    [onSelectRepo, repos]
  );

  const renderNode = ({ nodeDatum }: any) => {
    const attrs = nodeDatum.attributes as RepoTreeNodeAttributes | undefined;
    const type = attrs?.type;

    // --- USER NODE ---
    if (type === "user") {
      const avatarUrl = attrs.avatarUrl as string;

      return (
        <g>
          {/* border circle */}
          <circle
            cx={0}
            cy={0}
            r={32}
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth={2}
          />

          {/* avatar */}
          <image
            href={avatarUrl}
            x={-28}
            y={-28}
            width={56}
            height={56}
            clipPath="circle(28px at 28px 28px)"
          />
        </g>
      );
    }

    // --- LANGUAGE NODE ---
    if (type === "language") {
      const languageName = (attrs.languageName as string) ?? nodeDatum.name;
      const iconHref = getDeviconForLanguage(languageName);

      // Simple pill: [ icon ]  Language
      const pillWidth = 30;
      const pillHeight = 30;

      return (
        <g>
          {/* pill background */}
          <rect
            x={-pillWidth / 2}
            y={-pillHeight / 2}
            width={pillWidth}
            height={pillHeight}
            rx={pillHeight / 2}
            ry={pillHeight / 2}
            fill="#fff"
          />

          {/* icon, if found */}
          {iconHref && (
            <image
              href={iconHref}
              x={-pillWidth / 2 + 6}
              y={-pillHeight / 2 + 4}
              width={20}
              height={20}
            />
          )}

          {!iconHref && (
            <text
              x={0}
              y={3}
              fontSize={12}
              fill="#0f172a"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              ?
            </text>
          )}
        </g>
      );
    }

    // --- REPO NODE ---
    if (type === "repo") {
      const url = attrs?.url as string | undefined;

      const cardWidth = 220;
      const cardHeight = 40;

      return (
        <g>
          {/* card background */}
          <rect
            x={-cardWidth / 2}
            y={-cardHeight / 2}
            width={cardWidth}
            height={cardHeight}
            rx={8}
            ry={8}
            fill="#ffffff"
            stroke="#0f172a"
          />

          {/* repo name */}
          <text
            x={-cardWidth / 2 + 8}
            y={-4}
            fontSize={10}
            fontWeight="500"
            fill="#0f172a"
            textAnchor="start"
          >
            {nodeDatum.name}
          </text>

          {/* URL (displayed and clickable) */}
          {url && (
            <text
              x={-cardWidth / 2 + 8}
              y={12}
              fontSize={9}
              fontWeight="400"
              fill="#2563eb"
              textAnchor="start"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
            >
              Link
            </text>
          )}
        </g>
      );
    }

    // --- FALLBACK ---
    return (
      <g>
        <circle r={10} fill="#fff" stroke="#0f172a" />
        <text x={15} y={4} fontSize={10} fill="#0f172a">
          {nodeDatum.name}
        </text>
      </g>
    );
  };

  if (!repos.length) {
    return (
      <div className="text-sm text-slate-500">
        No repositories match the current filters.
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-[400px] w-full overflow-auto rounded-lg border bg-white"
    >
      <Tree
        data={treeData}
        orientation="horizontal"
        translate={translate}
        zoomable={true}
        collapsible={false} // we don't want clicks to collapse branches
        pathFunc="elbow"
        rootNodeClassName="rd3t-node rd3t-node--root"
        branchNodeClassName="rd3t-node rd3t-node--branch"
        leafNodeClassName="rd3t-node rd3t-node--leaf"
        onNodeClick={handleNodeClick}
        renderCustomNodeElement={renderNode}
      />
    </div>
  );
}
