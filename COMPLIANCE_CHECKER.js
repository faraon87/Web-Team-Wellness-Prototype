#!/usr/bin/env node

/**
 * Team Welly - Compliance Checker Script
 * 
 * Automated validation tool to ensure code changes comply with development governance standards.
 * Integrates with development workflows, CI/CD pipelines, and AI assistant processes.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class ComplianceChecker {
    constructor() {
        this.projectRoot = process.cwd();
        this.issues = [];
        this.score = 0;
        this.maxScore = 0;
        
        // Protected files that should not be modified without approval
        this.protectedFiles = [
            '.env',
            'package.json',
            'src/useAuth.js',
            'src/authService.js',
            'src/components/Navigation.js'
        ];

        // Required dependencies with their versions
        this.requiredDependencies = {
            'react': '^18.3.1',
            'react-dom': '^18.3.1',
            'react-router-dom': '^6.20.0',
            'firebase': '^11.10.0',
            'react-scripts': '5.0.1'
        };

        // Security patterns to avoid
        this.securityPatterns = [
            /API[_\s]*KEY[_\s]*=.*[^\s]/i,
            /SECRET[_\s]*=.*[^\s]/i,
            /PASSWORD[_\s]*=.*[^\s]/i,
            /TOKEN[_\s]*=.*[^\s]/i,
            /firebase[_\s]*api[_\s]*key.*[^\s]/i
        ];
    }

    /**
     * Main compliance check function
     */
    async runComplianceCheck(options = {}) {
        console.log('🔍 Starting Team Welly compliance check...\n');

        try {
            // Run all compliance checks
            await this.checkProtectedFiles();
            await this.checkSecurity();
            await this.checkCodeQuality();
            await this.checkDependencies();
            await this.checkUICompliance();
            await this.checkVersionControl();
            await this.checkTesting();
            await this.checkDeployment();

            // Generate report
            const report = this.generateReport(options.report);
            
            if (options.report) {
                this.saveReport(report);
            }

            this.displayResults();
            
            // Return exit code for CI/CD
            const criticalIssues = this.issues.filter(issue => issue.severity === 'critical');
            return criticalIssues.length === 0 ? 0 : 1;

        } catch (error) {
            console.error('❌ Compliance check failed:', error.message);
            return 1;
        }
    }

    /**
     * Check protected files
     */
    async checkProtectedFiles() {
        console.log('📋 Checking protected files...');
        
        this.protectedFiles.forEach(file => {
            this.maxScore += 3;
            
            if (fs.existsSync(file)) {
                // Check if file was recently modified (dangerous)
                const stats = fs.statSync(file);
                const lastModified = new Date(stats.mtime);
                const hoursAgo = (new Date() - lastModified) / (1000 * 60 * 60);
                
                if (hoursAgo < 1) {
                    this.addIssue('critical', `Protected file recently modified: ${file}`, 'protected_files');
                } else {
                    this.score += 3;
                }
            } else if (file === '.env') {
                this.addIssue('major', '.env file not found - may be using demo mode', 'protected_files');
                this.score += 1;
            } else if (this.isRequiredFile(file)) {
                this.addIssue('critical', `Required protected file missing: ${file}`, 'protected_files');
            } else {
                this.score += 3;
            }
        });
    }

    /**
     * Check security compliance
     */
    async checkSecurity() {
        console.log('🔒 Checking security compliance...');
        
        const sourceFiles = this.getSourceFiles();
        
        sourceFiles.forEach(file => {
            this.maxScore += 2;
            
            try {
                const content = fs.readFileSync(file, 'utf8');
                let hasSecurityIssue = false;

                // Check for hardcoded secrets
                this.securityPatterns.forEach(pattern => {
                    if (pattern.test(content)) {
                        this.addIssue('critical', `Potential hardcoded secret in ${file}`, 'security');
                        hasSecurityIssue = true;
                    }
                });

                // Check for proper environment variable usage
                if (content.includes('firebase') && !content.includes('process.env.REACT_APP_')) {
                    if (!content.includes('import') && !content.includes('from')) {
                        this.addIssue('major', `Firebase configuration may not use environment variables: ${file}`, 'security');
                        hasSecurityIssue = true;
                    }
                }

                if (!hasSecurityIssue) {
                    this.score += 2;
                }
                
            } catch (error) {
                this.addIssue('minor', `Could not read file for security check: ${file}`, 'security');
            }
        });

        // Check .env in .gitignore
        this.maxScore += 3;
        if (this.isEnvInGitignore()) {
            this.score += 3;
        } else {
            this.addIssue('critical', '.env file not properly excluded from version control', 'security');
        }
    }

    /**
     * Check code quality
     */
    async checkCodeQuality() {
        console.log('📐 Checking code quality...');
        
        const reactFiles = this.getReactFiles();
        
        reactFiles.forEach(file => {
            this.maxScore += 2;
            
            try {
                const content = fs.readFileSync(file, 'utf8');
                let qualityScore = 0;

                // Check for React import
                if (content.includes("import React") || content.includes("from 'react'")) {
                    qualityScore++;
                }

                // Check for proper functional component pattern
                if (content.includes('const ') && content.includes('= () =>')) {
                    qualityScore++;
                }

                // Check for error handling
                if (content.includes('try') && content.includes('catch')) {
                    qualityScore++;
                }

                // Check for loading states
                if (content.includes('loading') || content.includes('isLoading')) {
                    qualityScore++;
                }

                if (qualityScore >= 2) {
                    this.score += 2;
                } else {
                    this.addIssue('minor', `Code quality issues in ${file}`, 'code_quality');
                    this.score += Math.max(0, qualityScore - 1);
                }
                
            } catch (error) {
                this.addIssue('minor', `Could not analyze code quality: ${file}`, 'code_quality');
            }
        });
    }

    /**
     * Check dependencies
     */
    async checkDependencies() {
        console.log('📦 Checking dependencies...');
        
        this.maxScore += 5;
        
        try {
            if (!fs.existsSync('package.json')) {
                this.addIssue('critical', 'package.json file not found', 'dependencies');
                return;
            }

            const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
            const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
            
            let dependencyScore = 0;
            
            Object.keys(this.requiredDependencies).forEach(dep => {
                const requiredVersion = this.requiredDependencies[dep];
                const actualVersion = dependencies[dep];
                
                if (!actualVersion) {
                    this.addIssue('critical', `Required dependency missing: ${dep}`, 'dependencies');
                } else if (this.isVersionDowngrade(actualVersion, requiredVersion)) {
                    this.addIssue('critical', `Dependency downgraded: ${dep} (${actualVersion} < ${requiredVersion})`, 'dependencies');
                } else {
                    dependencyScore++;
                }
            });

            this.score += Math.min(5, dependencyScore);
            
        } catch (error) {
            this.addIssue('critical', 'Could not read package.json', 'dependencies');
        }
    }

    /**
     * Check UI/UX compliance
     */
    async checkUICompliance() {
        console.log('🎨 Checking UI/UX compliance...');
        
        const styleFiles = [...this.getReactFiles(), 'src/index.css'];
        
        styleFiles.forEach(file => {
            if (!fs.existsSync(file)) return;
            
            this.maxScore += 2;
            
            try {
                const content = fs.readFileSync(file, 'utf8');
                let uiScore = 0;

                // Check for Tailwind classes
                if (content.includes('className=') && (content.includes('bg-') || content.includes('text-'))) {
                    uiScore++;
                }

                // Check for responsive classes
                if (content.includes('md:') || content.includes('lg:') || content.includes('sm:')) {
                    uiScore++;
                }

                // Check for Team Welly colors
                if (content.includes('teal-') || content.includes('emerald-')) {
                    uiScore++;
                }

                if (uiScore >= 1) {
                    this.score += 2;
                } else {
                    this.addIssue('minor', `UI compliance issues in ${file}`, 'ui_compliance');
                    this.score += 1;
                }
                
            } catch (error) {
                this.addIssue('minor', `Could not check UI compliance: ${file}`, 'ui_compliance');
            }
        });
    }

    /**
     * Check version control compliance
     */
    async checkVersionControl() {
        console.log('🔄 Checking version control...');
        
        this.maxScore += 3;
        
        try {
            // Check if git is available
            execSync('git --version', { stdio: 'ignore' });
            
            // Check recent commits for proper format
            const recentCommits = execSync('git log --oneline -5', { encoding: 'utf8' });
            const commitLines = recentCommits.split('\n').filter(line => line.trim());
            
            let goodCommits = 0;
            commitLines.forEach(commit => {
                const message = commit.substring(8); // Skip commit hash
                if (message.match(/^(feat|fix|docs|style|refactor|test|chore):/)) {
                    goodCommits++;
                }
            });

            if (goodCommits >= commitLines.length * 0.6) {
                this.score += 3;
            } else {
                this.addIssue('minor', 'Commit messages do not follow conventional format', 'version_control');
                this.score += 1;
            }
            
        } catch (error) {
            this.addIssue('minor', 'Could not check git history - may not be a git repository', 'version_control');
            this.score += 1;
        }
    }

    /**
     * Check testing compliance
     */
    async checkTesting() {
        console.log('🧪 Checking testing compliance...');
        
        this.maxScore += 3;
        
        // Check for test files
        const testFiles = this.getTestFiles();
        if (testFiles.length > 0) {
            this.score += 2;
        } else {
            this.addIssue('major', 'No test files found', 'testing');
        }

        // Check if tests can run
        try {
            const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
            if (packageJson.scripts && packageJson.scripts.test) {
                this.score += 1;
            } else {
                this.addIssue('minor', 'No test script defined in package.json', 'testing');
            }
        } catch (error) {
            this.addIssue('minor', 'Could not check test configuration', 'testing');
        }
    }

    /**
     * Check deployment compliance
     */
    async checkDeployment() {
        console.log('🚀 Checking deployment compliance...');
        
        this.maxScore += 3;
        
        const deploymentFiles = ['railway.json', 'vercel.json', 'package.json'];
        let deploymentReady = 0;
        
        deploymentFiles.forEach(file => {
            if (fs.existsSync(file)) {
                deploymentReady++;
            }
        });

        if (deploymentReady >= 1) {
            this.score += 3;
        } else {
            this.addIssue('major', 'No deployment configuration found', 'deployment');
            this.score += 1;
        }
    }

    /**
     * Helper methods
     */
    addIssue(severity, message, category) {
        this.issues.push({
            severity,
            message,
            category,
            timestamp: new Date().toISOString()
        });
    }

    getSourceFiles() {
        const files = [];
        const extensions = ['.js', '.jsx', '.ts', '.tsx'];
        
        try {
            const srcFiles = this.getAllFiles('src/');
            files.push(...srcFiles.filter(file => 
                extensions.some(ext => file.endsWith(ext))
            ));
        } catch (error) {
            // Fallback if src directory doesn't exist
        }
        
        return files;
    }

    getReactFiles() {
        return this.getSourceFiles().filter(file => 
            file.includes('component') || file.includes('screen') || file.endsWith('App.js')
        );
    }

    getTestFiles() {
        const testPatterns = ['.test.', '.spec.', '__tests__'];
        return this.getAllFiles('./').filter(file =>
            testPatterns.some(pattern => file.includes(pattern))
        );
    }

    getAllFiles(dirPath) {
        const files = [];
        
        try {
            const items = fs.readdirSync(dirPath);
            items.forEach(item => {
                if (item.startsWith('.') || item === 'node_modules') return;
                
                const fullPath = path.join(dirPath, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isDirectory()) {
                    files.push(...this.getAllFiles(fullPath));
                } else {
                    files.push(fullPath);
                }
            });
        } catch (error) {
            // Directory doesn't exist or not accessible
        }
        
        return files;
    }

    isRequiredFile(file) {
        const required = ['src/useAuth.js', 'src/authService.js', 'src/components/Navigation.js'];
        return required.includes(file);
    }

    isEnvInGitignore() {
        try {
            if (fs.existsSync('.gitignore')) {
                const gitignore = fs.readFileSync('.gitignore', 'utf8');
                return gitignore.includes('.env');
            }
        } catch (error) {
            // Could not read .gitignore
        }
        return false;
    }

    isVersionDowngrade(actual, required) {
        // Simple version comparison - could be enhanced
        const cleanActual = actual.replace(/[\^~]/, '');
        const cleanRequired = required.replace(/[\^~]/, '');
        
        return cleanActual < cleanRequired;
    }

    calculateComplianceLevel() {
        const percentage = this.maxScore > 0 ? (this.score / this.maxScore) * 100 : 0;
        
        if (percentage >= 90) return { level: 'Excellent', emoji: '🟢', color: 'green' };
        if (percentage >= 75) return { level: 'Good', emoji: '🟡', color: 'yellow' };
        if (percentage >= 60) return { level: 'Needs Improvement', emoji: '🟠', color: 'orange' };
        return { level: 'Non-Compliant', emoji: '🔴', color: 'red' };
    }

    generateReport(includeDetails = false) {
        const compliance = this.calculateComplianceLevel();
        const criticalIssues = this.issues.filter(i => i.severity === 'critical');
        const majorIssues = this.issues.filter(i => i.severity === 'major');
        const minorIssues = this.issues.filter(i => i.severity === 'minor');

        let report = `
# Team Welly Compliance Report

**Date**: ${new Date().toISOString().split('T')[0]}
**Project**: Team Welly Wellness Platform
**Checked By**: Automated Compliance Checker

## Summary
- **Overall Score**: ${this.score}/${this.maxScore} (${Math.round((this.score/this.maxScore)*100)}%)
- **Compliance Level**: ${compliance.emoji} ${compliance.level}
- **Critical Issues**: ${criticalIssues.length}
- **Major Issues**: ${majorIssues.length}
- **Minor Issues**: ${minorIssues.length}
`;

        if (includeDetails) {
            report += `\n## Detailed Findings\n`;
            
            ['critical', 'major', 'minor'].forEach(severity => {
                const issues = this.issues.filter(i => i.severity === severity);
                if (issues.length > 0) {
                    report += `\n### ${severity.toUpperCase()} Issues:\n`;
                    issues.forEach(issue => {
                        report += `- [${issue.category}] ${issue.message}\n`;
                    });
                }
            });
        }

        return report;
    }

    saveReport(report) {
        const reportPath = path.join(this.projectRoot, 'compliance-report.md');
        fs.writeFileSync(reportPath, report, 'utf8');
        console.log(`📊 Compliance report saved to: ${reportPath}`);
    }

    displayResults() {
        const compliance = this.calculateComplianceLevel();
        
        console.log('\n' + '='.repeat(50));
        console.log(`${compliance.emoji} COMPLIANCE RESULT: ${compliance.level}`);
        console.log(`📊 Score: ${this.score}/${this.maxScore} (${Math.round((this.score/this.maxScore)*100)}%)`);
        console.log('='.repeat(50));

        if (this.issues.length > 0) {
            console.log('\n🚨 Issues Found:');
            
            const criticalIssues = this.issues.filter(i => i.severity === 'critical');
            const majorIssues = this.issues.filter(i => i.severity === 'major');
            const minorIssues = this.issues.filter(i => i.severity === 'minor');
            
            if (criticalIssues.length > 0) {
                console.log(`\n❌ CRITICAL (${criticalIssues.length}):`);
                criticalIssues.forEach(issue => console.log(`  • ${issue.message}`));
            }
            
            if (majorIssues.length > 0) {
                console.log(`\n⚠️  MAJOR (${majorIssues.length}):`);
                majorIssues.forEach(issue => console.log(`  • ${issue.message}`));
            }
            
            if (minorIssues.length > 0) {
                console.log(`\n🔸 MINOR (${minorIssues.length}):`);
                minorIssues.forEach(issue => console.log(`  • ${issue.message}`));
            }
            
            console.log('\n💡 Tip: Run with --report flag to generate detailed report');
        } else {
            console.log('\n✅ No compliance issues found!');
        }
        
        console.log('\n📋 Next steps:');
        console.log('  1. Address any critical issues immediately');
        console.log('  2. Review development governance document');
        console.log('  3. Test authentication flows after changes');
        console.log('  4. Update changelog with modifications\n');
    }
}

// Command line interface
if (require.main === module) {
    const args = process.argv.slice(2);
    const checker = new ComplianceChecker();
    
    const options = {
        report: args.includes('--report'),
        preCommit: args.includes('--pre-commit'),
        path: args.find(arg => arg.startsWith('--path='))?.split('=')[1]
    };
    
    if (args.includes('--help')) {
        console.log(`
Team Welly Compliance Checker

Usage:
  node COMPLIANCE_CHECKER.js                    - Run full compliance check
  node COMPLIANCE_CHECKER.js --report           - Generate detailed report
  node COMPLIANCE_CHECKER.js --pre-commit       - Run pre-commit checks
  node COMPLIANCE_CHECKER.js --path=src/        - Check specific directory
  node COMPLIANCE_CHECKER.js --help             - Show this help

Options:
  --report         Generate detailed compliance report
  --pre-commit     Run pre-commit validation checks
  --path=DIR       Check specific directory only
  --help           Show help information
        `);
        process.exit(0);
    }
    
    checker.runComplianceCheck(options)
        .then(exitCode => process.exit(exitCode))
        .catch(error => {
            console.error('❌ Compliance checker error:', error.message);
            process.exit(1);
        });
}

module.exports = ComplianceChecker;