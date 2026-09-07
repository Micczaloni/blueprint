type EmptyStateProps = { onCreateProject: () => void };

function EmptyState({ onCreateProject }: EmptyStateProps) {
  return <section><p>Nie masz jeszcze żadnych projektów.</p><button onClick={onCreateProject}>+ Nowy projekt</button></section>;
}
export default EmptyState;