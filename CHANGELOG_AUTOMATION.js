#!/usr/bin/env node

/**
 * Team Welly - Automatic Changelog Update Script
 * 
 * This script automatically updates the CHANGELOG.md file when code changes are detected.
 * It can be run manually or integrated into CI/CD pipelines and development workflows.
 * 
 * Usage:
 * - Manual: node CHANGELOG_AUTOMATION.js
 * - Git Hook: Add to .git/hooks/post-commit
 * - CI/CD: Integrate into deployment pipeline
 * - AI Assistant: Call during development workflow
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ChangelogAutomation {
    constructor() {
        this.changelogPath = path.join(__dirname, 'CHANGELOG.md');
        this.governancePath = path.join(__dirname, 'DEVELOPMENT_GOVERNANCE.md');
        this.packageJsonPath = path.join(__dirname, 'package.json');
        this.currentDate = new Date().toISOString().split('T')[0];
    }

    /**
     * Main automation function
     */
    async run() {
        try {
            console.log('🚀 Starting automatic changelog update...');
            
            // Detect changes
            const changes = await this.detectChanges();
            
            if (changes.length === 0) {
                console.log('✅ No significant changes detected. Changelog up to date.');
                return;
            }

            // Update changelog
            await this.updateChangelog(changes);
            
            console.log('✅ Changelog updated successfully!');
            console.log(`📝 Added ${changes.length} change entries`);
            
        } catch (error) {
            console.error('❌ Error updating changelog:', error.message);
            process.exit(1);
        }
    }

    /**
     * Detect changes in the codebase
     */
    async detectChanges() {
        const changes = [];

        try {
            // Check for git changes
            const gitChanges = this.detectGitChanges();
            changes.push(...gitChanges);

            // Check for package.json changes
            const packageChanges = this.detectPackageChanges();
            changes.push(...packageChanges);

            // Check for new files
            const newFiles = this.detectNewFiles();
            changes.push(...newFiles);

            // Check for authentication changes
            const authChanges = this.detectAuthChanges();
            changes.push(...authChanges);

            // Check for deployment changes
            const deploymentChanges = this.detectDeploymentChanges();
            changes.push(...deploymentChanges);

        } catch (error) {
            console.log('⚠️  Git not available, using file-based detection');
            // Fallback to file-based detection
            const fileChanges = this.detectFileChanges();
            changes.push(...fileChanges);
        }

        return this.deduplicateChanges(changes);
    }

    /**
     * Detect git changes
     */
    detectGitChanges() {
        const changes = [];
        
        try {
            // Get recent commits
            const recentCommits = execSync('git log --oneline -10', { encoding: 'utf8' });
            const commitLines = recentCommits.split('\n').filter(line => line.trim());

            commitLines.forEach(commit => {
                const [hash, ...messageParts] = commit.split(' ');
                const message = messageParts.join(' ');

                if (message.includes('feat:')) {
                    changes.push({
                        type: 'added',
                        description: message.replace('feat:', '').trim(),
                        hash: hash.substring(0, 7)
                    });
                } else if (message.includes('fix:')) {
                    changes.push({
                        type: 'fixed',
                        description: message.replace('fix:', '').trim(),
                        hash: hash.substring(0, 7)
                    });
                } else if (message.includes('docs:')) {
                    changes.push({
                        type: 'documentation',
                        description: message.replace('docs:', '').trim(),
                        hash: hash.substring(0, 7)
                    });
                }
            });

        } catch (error) {
            console.log('⚠️  Could not access git history');
        }

        return changes;
    }

    /**
     * Detect package.json changes
     */
    detectPackageChanges() {
        const changes = [];

        try {
            if (fs.existsSync(this.packageJsonPath)) {
                const packageJson = JSON.parse(fs.readFileSync(this.packageJsonPath, 'utf8'));
                
                // Check for version changes
                if (packageJson.version) {
                    changes.push({
                        type: 'changed',
                        description: `Updated to version ${packageJson.version}`,
                        category: 'version'
                    });
                }

                // Check for new dependencies
                const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
                const knownDeps = ['react', 'react-dom', 'react-router-dom', 'firebase', 'lucide-react'];
                
                Object.keys(dependencies).forEach(dep => {
                    if (!knownDeps.includes(dep)) {
                        changes.push({
                            type: 'added',
                            description: `New dependency: ${dep} ${dependencies[dep]}`,
                            category: 'dependencies'
                        });
                    }
                });
            }
        } catch (error) {
            console.log('⚠️  Could not read package.json');
        }

        return changes;
    }

    /**
     * Detect new files
     */
    detectNewFiles() {
        const changes = [];
        const importantExtensions = ['.js', '.jsx', '.ts', '.tsx', '.md', '.json'];
        
        try {
            const files = this.getAllFiles('./');
            const newFiles = files.filter(file => {
                const ext = path.extname(file);
                return importantExtensions.includes(ext) && this.isRecentFile(file);
            });

            newFiles.forEach(file => {
                changes.push({
                    type: 'added',
                    description: `New file: ${file}`,
                    category: 'files'
                });
            });

        } catch (error) {
            console.log('⚠️  Could not scan for new files');
        }

        return changes;
    }

    /**
     * Detect authentication-related changes
     */
    detectAuthChanges() {
        const changes = [];
        const authFiles = ['src/useAuth.js', 'src/authService.js', '.env'];

        authFiles.forEach(file => {
            if (fs.existsSync(file) && this.isRecentFile(file)) {
                changes.push({
                    type: 'changed',
                    description: `Updated authentication system: ${path.basename(file)}`,
                    category: 'authentication'
                });
            }
        });

        return changes;
    }

    /**
     * Detect deployment-related changes
     */
    detectDeploymentChanges() {
        const changes = [];
        const deploymentFiles = ['railway.json', 'vercel.json', 'Dockerfile'];

        deploymentFiles.forEach(file => {
            if (fs.existsSync(file) && this.isRecentFile(file)) {
                changes.push({
                    type: 'changed',
                    description: `Updated deployment configuration: ${path.basename(file)}`,
                    category: 'deployment'
                });
            }
        });

        return changes;
    }

    /**
     * Fallback file-based change detection
     */
    detectFileChanges() {
        const changes = [];
        
        // Check for governance documents
        if (fs.existsSync(this.governancePath)) {
            changes.push({
                type: 'added',
                description: 'Development governance framework implemented',
                category: 'governance'
            });
        }

        return changes;
    }

    /**
     * Update the changelog file
     */
    async updateChangelog(changes) {
        if (!fs.existsSync(this.changelogPath)) {
            console.log('⚠️  Changelog file not found, skipping update');
            return;
        }

        let changelogContent = fs.readFileSync(this.changelogPath, 'utf8');
        
        // Find the insertion point (after "## 📋 **Latest Updates - January 2025**")
        const updatesSectionRegex = /## 📋 \*\*Latest Updates - January 2025\*\*/;
        const insertionMatch = changelogContent.match(updatesSectionRegex);
        
        if (!insertionMatch) {
            console.log('⚠️  Could not find updates section in changelog');
            return;
        }

        // Create new entry
        const newEntry = this.createChangelogEntry(changes);
        const insertionPoint = insertionMatch.index + insertionMatch[0].length;
        
        // Insert the new entry
        const beforeInsertion = changelogContent.substring(0, insertionPoint);
        const afterInsertion = changelogContent.substring(insertionPoint);
        
        const updatedContent = beforeInsertion + '\n\n' + newEntry + afterInsertion;
        
        // Write back to file
        fs.writeFileSync(this.changelogPath, updatedContent, 'utf8');
        
        console.log(`📝 Updated ${this.changelogPath}`);
    }

    /**
     * Create changelog entry from changes
     */
    createChangelogEntry(changes) {
        const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
        let entry = `### [${this.currentDate}] - Automated Update\n`;
        
        // Group changes by type
        const groupedChanges = this.groupChangesByType(changes);
        
        Object.keys(groupedChanges).forEach(type => {
            const typeChanges = groupedChanges[type];
            const typeTitle = this.capitalizeFirstLetter(type);
            
            entry += `#### ${typeTitle}\n`;
            typeChanges.forEach(change => {
                entry += `- ${change.description}\n`;
            });
            entry += '\n';
        });

        entry += `*Last automated update: ${timestamp} UTC*\n`;
        
        return entry;
    }

    /**
     * Group changes by type
     */
    groupChangesByType(changes) {
        const grouped = {};
        
        changes.forEach(change => {
            const type = change.type || 'changed';
            if (!grouped[type]) {
                grouped[type] = [];
            }
            grouped[type].push(change);
        });
        
        return grouped;
    }

    /**
     * Remove duplicate changes
     */
    deduplicateChanges(changes) {
        const seen = new Set();
        return changes.filter(change => {
            const key = `${change.type}:${change.description}`;
            if (seen.has(key)) {
                return false;
            }
            seen.add(key);
            return true;
        });
    }

    /**
     * Get all files recursively
     */
    getAllFiles(dirPath) {
        const files = [];
        const items = fs.readdirSync(dirPath);

        items.forEach(item => {
            const fullPath = path.join(dirPath, item);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory() && !item.startsWith('.') && item !== 'node_modules') {
                files.push(...this.getAllFiles(fullPath));
            } else if (stat.isFile()) {
                files.push(fullPath);
            }
        });

        return files;
    }

    /**
     * Check if file was modified recently (last 24 hours)
     */
    isRecentFile(filePath) {
        try {
            const stats = fs.statSync(filePath);
            const now = new Date();
            const fileTime = new Date(stats.mtime);
            const diffHours = (now - fileTime) / (1000 * 60 * 60);
            
            return diffHours <= 24;
        } catch (error) {
            return false;
        }
    }

    /**
     * Capitalize first letter
     */
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

// Git Hook Integration
function setupGitHooks() {
    const hookPath = '.git/hooks/post-commit';
    const hookContent = `#!/bin/sh
# Auto-update changelog after commit
node CHANGELOG_AUTOMATION.js
`;

    try {
        if (!fs.existsSync('.git/hooks')) {
            fs.mkdirSync('.git/hooks', { recursive: true });
        }
        
        fs.writeFileSync(hookPath, hookContent, { mode: 0o755 });
        console.log('✅ Git post-commit hook installed');
    } catch (error) {
        console.log('⚠️  Could not install git hook:', error.message);
    }
}

// CI/CD Integration Helper
function generateCIConfig() {
    const githubAction = `
name: Update Changelog
on:
  push:
    branches: [ main ]
jobs:
  update-changelog:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - name: Update Changelog
      run: node CHANGELOG_AUTOMATION.js
    - name: Commit changes
      run: |
        git config --local user.email "action@github.com"
        git config --local user.name "GitHub Action"
        git add CHANGELOG.md
        git diff --staged --quiet || git commit -m "docs: auto-update changelog"
        git push
`;

    fs.writeFileSync('.github/workflows/changelog.yml', githubAction);
    console.log('✅ GitHub Action workflow created');
}

// Command line interface
if (require.main === module) {
    const args = process.argv.slice(2);
    const automation = new ChangelogAutomation();

    if (args.includes('--install-hooks')) {
        setupGitHooks();
    } else if (args.includes('--setup-ci')) {
        generateCIConfig();
    } else if (args.includes('--help')) {
        console.log(`
Team Welly Changelog Automation

Usage:
  node CHANGELOG_AUTOMATION.js                 - Update changelog
  node CHANGELOG_AUTOMATION.js --install-hooks - Install git hooks
  node CHANGELOG_AUTOMATION.js --setup-ci      - Setup CI/CD workflow
  node CHANGELOG_AUTOMATION.js --help          - Show this help

Options:
  --install-hooks    Install git post-commit hook
  --setup-ci         Generate GitHub Action workflow
  --help            Show help information
        `);
    } else {
        automation.run();
    }
}

module.exports = ChangelogAutomation;