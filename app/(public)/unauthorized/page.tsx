export default function UnauthorizedPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">401</h1>
        <p className="text-lg text-muted-foreground">Unauthorized access</p>
      </div>
    </div>
  );
}
